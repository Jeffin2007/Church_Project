import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  PrismaHealthIndicator,
  HealthCheckResult,
  HealthIndicatorResult,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { PrismaService } from '../database/prisma.service';
import { Public } from '../common/decorators/public.decorator';

/**
 * Health Controller
 *
 * GET /health           — liveness (always returns 200 if server is up)
 * GET /health/db        — database (PostgreSQL) connectivity
 * GET /health/storage   — file storage availability (stub)
 * GET /health/payment   — payment gateway connectivity (stub)
 */
@ApiTags('health')
@Public()
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaHealth: PrismaHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  /** Liveness check — confirms server is running */
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Liveness check' })
  async check(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }

  /** Database health — confirms Prisma can reach PostgreSQL */
  @Get('db')
  @HealthCheck()
  @ApiOperation({ summary: 'Database connectivity check' })
  async checkDatabase(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.prismaHealth.pingCheck(
          'postgresql',
          this.prisma as unknown as Parameters<PrismaHealthIndicator['pingCheck']>[1],
        ),
    ]);
  }

  /** Storage health — stub for file storage (e.g. S3, local) */
  @Get('storage')
  @HealthCheck()
  @ApiOperation({ summary: 'File storage health check' })
  async checkStorage(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        Promise.resolve({ storage: { status: 'up', note: 'stub — not yet configured' } }),
    ]);
  }

  /** Payment gateway health — stub */
  @Get('payment')
  @HealthCheck()
  @ApiOperation({ summary: 'Payment gateway health check' })
  async checkPayment(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        Promise.resolve({ payment: { status: 'up', note: 'stub — not yet configured' } }),
    ]);
  }
}
