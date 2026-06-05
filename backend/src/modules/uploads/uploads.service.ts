import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { pipeline } from 'stream/promises';
import { Readable } from 'stream';
import { API_PREFIX } from '../../common/constants';
import { CloudinaryService } from '../../integrations/cloudinary/cloudinary.service';

const UPLOAD_SUBDIR = join('uploads', 'variants');

@Injectable()
export class UploadsService {
  private readonly logger = new Logger(UploadsService.name);
  private readonly uploadDir = join(process.cwd(), UPLOAD_SUBDIR);

  constructor(
    private readonly cloudinary: CloudinaryService,
    private readonly config: ConfigService,
  ) {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  private extensionFromMime(mime: string): string {
    const map: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    };
    return map[mime] ?? '.jpg';
  }

  private hasCloudinaryConfig(): boolean {
    return Boolean(
      this.config.get<string>('cloudinary.cloudName') &&
        this.config.get<string>('cloudinary.apiKey') &&
        this.config.get<string>('cloudinary.apiSecret'),
    );
  }

  async saveLocal(buffer: Buffer, mime: string): Promise<string> {
    const filename = `${randomUUID()}${this.extensionFromMime(mime)}`;
    const filepath = join(this.uploadDir, filename);
    await pipeline(Readable.from(buffer), createWriteStream(filepath));
    return filename;
  }

  buildLocalFileUrl(filename: string): string {
    return `/${API_PREFIX}/uploads/files/${filename}`;
  }

  resolveLocalPath(filename: string): string | null {
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '');
    if (!safe || safe !== filename) return null;
    const filepath = join(this.uploadDir, safe);
    if (!existsSync(filepath)) return null;
    return filepath;
  }

  async uploadImage(
    buffer: Buffer,
    mime: string,
  ): Promise<{ imageUrl: string; storage: 'cloudinary' | 'local' }> {
    if (this.hasCloudinaryConfig()) {
      try {
        const imageUrl = await this.cloudinary.uploadBuffer(buffer);
        return { imageUrl, storage: 'cloudinary' };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Cloudinary upload failed';
        this.logger.warn(`Cloudinary failed, using local storage: ${message}`);
      }
    }

    const filename = await this.saveLocal(buffer, mime);
    return {
      imageUrl: this.buildLocalFileUrl(filename),
      storage: 'local',
    };
  }
}
