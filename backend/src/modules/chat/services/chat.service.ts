import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { successResponse } from '../../../common/utils/api-response.util';
import { SendMessageDto } from '../dto/send-message.dto';
import { ChatGateway } from '../gateways/chat.gateway';
import { ChatMapper } from '../mappers/chat.mapper';
import { ChatRepository } from '../repositories/chat.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    @Inject(forwardRef(() => ChatGateway))
    private readonly chatGateway: ChatGateway,
  ) {}

  async getConversations() {
    const rows = await this.chatRepository.listConversations();
    const data = rows.map((row) =>
      ChatMapper.toConversation(row.conversation, {
        customerName: row.customerName ?? (row.conversation.guestId ? 'Guest (not signed in)' : 'Guest'),
        customerEmail: row.customerEmail,
        lastMessage: row.lastMessage,
        unreadCount: row.unreadCount,
      }),
    );
    return successResponse(data);
  }

  async getMessages(conversationId: string) {
    const conversation =
      await this.chatRepository.findConversationById(conversationId);
    if (!conversation) {
      throw new BusinessException('Conversation not found', 404);
    }
    const rows = await this.chatRepository.getMessages(conversationId);
    return successResponse(rows.map(ChatMapper.toMessage));
  }

  async getMessagesForCustomer(
    conversationId: string,
    userId?: string,
    guestId?: string,
  ) {
    await this.assertConversationAccess(conversationId, userId, guestId);
    return this.getMessages(conversationId);
  }

  async ensureConversation(customerId: string) {
    let conversation =
      await this.chatRepository.findOpenByCustomerId(customerId);
    if (!conversation) {
      conversation = await this.chatRepository.createConversation({
        id: randomUUID(),
        customerId,
        status: 'open',
      });
    }
    return successResponse(ChatMapper.toConversation(conversation!));
  }

  async ensureGuestConversation(guestId: string) {
    let conversation = await this.chatRepository.findOpenByGuestId(guestId);
    if (!conversation) {
      conversation = await this.chatRepository.createConversation({
        id: randomUUID(),
        guestId,
        status: 'open',
      });
    }
    return successResponse(ChatMapper.toConversation(conversation!));
  }

  async linkGuestConversation(guestId: string, customerId: string) {
    await this.chatRepository.linkGuestToCustomer(guestId, customerId);
    const conversation =
      await this.chatRepository.findOpenByCustomerId(customerId);
    if (conversation) {
      return successResponse(ChatMapper.toConversation(conversation));
    }
    return this.ensureConversation(customerId);
  }

  async sendMessage(
    senderId: string,
    senderRole: 'customer' | 'admin' | 'staff',
    dto: SendMessageDto,
  ) {
    const conversation = await this.chatRepository.findConversationById(
      dto.conversationId,
    );
    if (!conversation) {
      throw new BusinessException('Conversation not found', 404);
    }

    if (senderRole === 'customer') {
      const allowed =
        conversation.customerId === senderId ||
        conversation.guestId === senderId;
      if (!allowed) {
        throw new BusinessException('Not allowed to send messages', 403);
      }
    }

    const row = await this.chatRepository.saveMessage({
      id: randomUUID(),
      conversationId: dto.conversationId,
      senderId,
      senderRole: senderRole === 'staff' ? 'admin' : senderRole,
      content: dto.content,
      imageUrl: dto.imageUrl,
      productId: dto.productId,
      isRead: false,
    });

    const message = ChatMapper.toMessage(row);
    this.chatGateway.broadcastMessage(dto.conversationId, message);
    return message;
  }

  async sendGuestMessage(guestId: string, conversationId: string, content: string) {
    return this.sendMessage(guestId, 'customer', { conversationId, content });
  }

  async markAsRead(conversationId: string) {
    await this.chatRepository.markCustomerMessagesRead(conversationId);
    return successResponse({ ok: true });
  }

  async getUnreadCount() {
    const count = await this.chatRepository.countUnreadForStaff();
    return successResponse({ count });
  }

  private async assertConversationAccess(
    conversationId: string,
    userId?: string,
    guestId?: string,
  ) {
    const conversation =
      await this.chatRepository.findConversationById(conversationId);
    if (!conversation) {
      throw new BusinessException('Conversation not found', 404);
    }
    if (userId && conversation.customerId === userId) return;
    if (guestId && conversation.guestId === guestId) return;
    if (!userId && !guestId) return;
    throw new BusinessException('Not allowed to view conversation', 403);
  }
}
