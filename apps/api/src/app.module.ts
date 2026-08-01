import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

// Core infrastructure modules
import { AuditModule } from './core/audit/audit.module';
import { LoggingModule } from './core/logging/logging.module';
import { NotificationModule } from './core/notification/notification.module';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { FamilyModule } from './modules/family/family.module';
import { PaymentModule } from './modules/payment/payment.module';
import { RequestModule } from './modules/request/request.module';
import { CmsModule } from './modules/cms/cms.module';
import { CalendarModule } from './modules/calendar/calendar.module';
import { MinistryModule } from './modules/ministry/ministry.module';

@Module({
  imports: [
    // ─── Config ────────────────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      envFilePath: ['.env.local', `.env.${process.env['NODE_ENV'] ?? 'development'}`, '.env'],
      cache: true,
    }),

    // ─── Pino Structured Logging ───────────────────────────────────────────────
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env['NODE_ENV'] === 'production' ? 'info' : 'debug',
        transport:
          process.env['NODE_ENV'] !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
        customProps: () => ({ context: 'HTTP' }),
        genReqId: (req) => {
          return (req.headers['x-request-id'] as string) ?? crypto.randomUUID();
        },
        serializers: {
          req(req: { method: string; url: string; id: string }) {
            return { method: req.method, url: req.url, requestId: req.id };
          },
        },
      },
    }),

    // ─── Rate Limiting ─────────────────────────────────────────────────────────
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 60_000, // 1 minute
        limit: 100,
      },
      {
        name: 'long',
        ttl: 3_600_000, // 1 hour
        limit: 1000,
      },
    ]),

    // ─── Infrastructure ─────────────────────────────────────────────────────────
    DatabaseModule,
    AuditModule,
    LoggingModule,
    NotificationModule,

    // ─── Health ────────────────────────────────────────────────────────────────
    HealthModule,

    // ─── Feature Modules ───────────────────────────────────────────────────────
    AuthModule,
    FamilyModule,
    PaymentModule,
    RequestModule,
    CmsModule,
    CalendarModule,
    MinistryModule,
  ],
})
export class AppModule {}
