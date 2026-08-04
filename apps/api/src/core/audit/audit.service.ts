import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import type { AuditAction } from '@qoas/types';

import { PrismaService } from '../../database/prisma.service';

export interface CreateAuditLogDto {
  userId?: string | null;
  action: AuditAction;
  entity: string;
  entityId?: string | null;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  ipAddress?: string | null;
  requestId?: string | null;
}

/**
 * AuditService — Core infrastructure.
 *
 * Records an immutable audit trail for all significant operations.
 * Every write operation across the system MUST call auditService.log().
 *
 * Architecture rule: AuditService is NEVER the caller — it is ALWAYS called BY services.
 */
@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectPinoLogger(AuditService.name)
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Records an audit log entry.
   * Failures are caught and logged — never let audit failure break business logic.
   */
  async log(dto: CreateAuditLogDto): Promise<void> {
    try {
      // TODO: Uncomment once Prisma AuditLog model is defined in migration
      // await this.prisma.auditLog.create({
      //   data: {
      //     userId: dto.userId,
      //     action: dto.action,
      //     entity: dto.entity,
      //     entityId: dto.entityId,
      //     before: dto.before ? JSON.stringify(dto.before) : null,
      //     after: dto.after ? JSON.stringify(dto.after) : null,
      //     ipAddress: dto.ipAddress,
      //     requestId: dto.requestId,
      //   },
      // });

      this.logger.info(
        {
          audit: true,
          userId: dto.userId,
          action: dto.action,
          entity: dto.entity,
          entityId: dto.entityId,
          requestId: dto.requestId,
        },
        `AUDIT: ${dto.action} on ${dto.entity}`,
      );
    } catch (error) {
      // NEVER let audit failure crash the business operation
      this.logger.error({ error, dto }, 'Failed to write audit log — operation still succeeded');
    }
  }
}
