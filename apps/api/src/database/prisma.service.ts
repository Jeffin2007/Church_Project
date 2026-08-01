import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectPinoLogger(PrismaService.name)
    private readonly logger: PinoLogger,
  ) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.info('✅ Prisma connected to PostgreSQL');

    // Log slow queries in development
    if (process.env['NODE_ENV'] !== 'production') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.$on('query' as never, (event: any) => {
        if ((event as { duration: number }).duration > 500) {
          this.logger.warn(
            {
              duration: (event as { duration: number }).duration,
              query: (event as { query: string }).query,
            },
            'Slow query detected',
          );
        }
      });
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.info('Prisma disconnected');
  }

  /**
   * Soft-delete helper — sets deletedAt to now.
   * Use instead of .delete() for entities with soft delete.
   */
  async softDelete(
    model: keyof Omit<
      PrismaClient,
      | '$connect'
      | '$disconnect'
      | '$on'
      | '$transaction'
      | '$queryRaw'
      | '$executeRaw'
      | '$use'
      | '$extends'
    >,
    id: string,
  ): Promise<void> {
    // @ts-expect-error — dynamic model access
    await this[model].update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
