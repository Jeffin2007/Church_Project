import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/**
 * LoggingService — thin wrapper around Pino logger.
 * Provides context-aware structured logging for services
 * that are not injected with PinoLogger directly.
 */
@Injectable()
export class LoggingService {
  constructor(
    @InjectPinoLogger(LoggingService.name)
    private readonly logger: PinoLogger,
  ) {}

  log(message: string, context?: Record<string, unknown>): void {
    this.logger.info(context ?? {}, message);
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.logger.warn(context ?? {}, message);
  }

  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    this.logger.error({ error, ...context }, message);
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.logger.debug(context ?? {}, message);
  }
}
