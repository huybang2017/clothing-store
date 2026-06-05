import {
  Order,
  OrderItem,
  OrderStatusHistory,
} from '../../../database/schema/orders';

const TIMELINE_STEPS: Order['status'][] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
];

const TIMELINE_NOTES: Record<string, string> = {
  pending: 'Đơn hàng đã được tạo',
  confirmed: 'Đơn hàng đã được xác nhận',
  processing: 'Đơn hàng đang được đóng gói',
  shipped: 'Đơn hàng đã bàn giao cho đơn vị vận chuyển',
  delivered: 'Giao hàng thành công',
  cancelled: 'Đơn hàng đã bị hủy',
};

export class OrderMapper {
  static buildStatusHistory(order: Order, rows: OrderStatusHistory[] = []) {
    if (rows.length) {
      return rows.map((r) => ({
        status: r.status,
        createdAt: r.createdAt,
        note: r.note,
      }));
    }
    if (order.status === 'cancelled') {
      return [
        {
          status: 'pending' as const,
          createdAt: order.createdAt,
          note: TIMELINE_NOTES.pending,
        },
        {
          status: 'cancelled' as const,
          createdAt: order.updatedAt,
          note: order.cancelReason ?? TIMELINE_NOTES.cancelled,
        },
      ];
    }
    const idx = TIMELINE_STEPS.indexOf(order.status);
    return TIMELINE_STEPS.slice(0, idx + 1).map((status, i) => ({
      status,
      createdAt: i === idx ? order.updatedAt : order.createdAt,
      note: TIMELINE_NOTES[status],
    }));
  }

  static paymentLabels(order: Order) {
    const methodKey = (order.paymentMethod ?? 'cod').toLowerCase();
    const methodMap: Record<string, string> = {
      cod: 'Thanh toán khi nhận hàng',
      bank_transfer: 'Chuyển khoản ngân hàng',
      vnpay: 'VNPay',
      momo: 'MoMo',
    };
    const statusMap: Record<string, string> = {
      unpaid: 'Chưa thanh toán',
      pending: 'Đang chờ xác nhận',
      processing: 'Đang xử lý thanh toán',
      paid: 'Đã thanh toán',
      failed: 'Thanh toán thất bại',
      cancelled: 'Đã hủy',
      refunded: 'Đã hoàn tiền',
    };
    return {
      paymentMethod:
        methodMap[methodKey] ??
        order.paymentMethod ??
        'Thanh toán khi nhận hàng',
      paymentStatus: statusMap[order.paymentStatus] ?? 'Chưa thanh toán',
    };
  }

  static toResponse(
    order: Order,
    items: OrderItem[] = [],
    statusHistory: OrderStatusHistory[] = [],
    extras?: { itemCount?: number },
  ) {
    const payments = this.paymentLabels(order);
    return {
      ...order,
      subtotal: Number(order.subtotal),
      discount: Number(order.discount ?? 0),
      shippingFee: Number(order.shippingFee ?? 0),
      total: Number(order.total),
      ...payments,
      itemCount: extras?.itemCount ?? items.length,
      items: items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
        variant: item.variantName ?? undefined,
      })),
      statusHistory: this.buildStatusHistory(order, statusHistory),
    };
  }

  static toResponseList(
    entries: {
      order: Order;
      itemCount: number;
      previewItems: OrderItem[];
    }[],
  ) {
    return entries.map(({ order, itemCount, previewItems }) => ({
      ...this.toResponse(order, previewItems, [], { itemCount }),
    }));
  }
}
