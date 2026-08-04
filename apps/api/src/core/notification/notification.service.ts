import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/**
 * NotificationService — Sprint 0 stub.
 *
 * Will be implemented in Sprint 3 with:
 * - Email (SMTP / SendGrid)
 * - SMS (Twilio or MSG91)
 * - In-app notifications
 * - Push notifications
 */
@Injectable()
export class NotificationService {
  constructor(
    @InjectPinoLogger(NotificationService.name)
    private readonly logger: PinoLogger,
  ) {}

  async sendEmail(to: string, subject: string, _body: string): Promise<void> {
    // TODO: Implement in Sprint 3
    this.logger.debug({ to, subject }, 'Email notification stub — not yet sent');
  }

  async sendSms(to: string, message: string): Promise<void> {
    // TODO: Implement in Sprint 3
    this.logger.debug(
      { to, message: message.slice(0, 20) },
      'SMS notification stub — not yet sent',
    );
  }
}
