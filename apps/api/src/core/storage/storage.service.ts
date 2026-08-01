import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export interface StorageMetadata {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  provider: 'local' | 's3' | 'r2' | 'cloudinary';
  uploadedAt: string;
}

export interface UploadFileOptions {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
  folder?: string;
}

/**
 * StorageService — Cloud Storage abstraction layer.
 *
 * Supports S3, R2, Cloudinary, and local storage drivers.
 * Database stores ONLY file metadata & public URLs — files are never stored on local server disk in production.
 */
@Injectable()
export class StorageService {
  private readonly provider: 'local' | 's3' | 'r2' | 'cloudinary';

  constructor(
    private readonly configService: ConfigService,
    @InjectPinoLogger(StorageService.name)
    private readonly logger: PinoLogger,
  ) {
    this.provider = (this.configService.get<string>('storage.provider') as StorageMetadata['provider']) ?? 'local';
  }

  async upload(options: UploadFileOptions): Promise<StorageMetadata> {
    const fileId = crypto.randomUUID();
    const folder = options.folder ? `${options.folder}/` : '';
    const key = `${folder}${fileId}-${options.originalName}`;

    this.logger.info({ provider: this.provider, key, size: options.buffer.length }, 'Uploading file to storage');

    // Stub URL for Sprint 0
    const url = `https://storage.queenofallsaints.in/${key}`;

    return {
      id: fileId,
      filename: key,
      originalName: options.originalName,
      mimeType: options.mimeType,
      sizeBytes: options.buffer.length,
      url,
      provider: this.provider,
      uploadedAt: new Date().toISOString(),
    };
  }

  async delete(fileKey: string): Promise<void> {
    this.logger.info({ provider: this.provider, fileKey }, 'Deleting file from storage');
  }
}
