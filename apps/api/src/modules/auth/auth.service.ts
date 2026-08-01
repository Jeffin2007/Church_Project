import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';

import { AuditAction } from '@qoas/types';
import { BCRYPT_ROUNDS } from '@qoas/constants';

import { PrismaService } from '../../database/prisma.service';
import { AuditService } from '../../core/audit/audit.service';
import type { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

import type { LoginDto } from './dto/login.dto';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface UserRecord {
  id: string;
  email: string | null;
  passwordHash: string | null;
  role: string;
  familyId: string | null;
  isActive: boolean;
}

/**
 * AuthService — handles all authentication business logic.
 *
 * Architecture rules:
 * - No HTTP concerns (no Request/Response objects)
 * - No business logic in AuthController
 * - Audit every auth event
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
  ) {}

  // ─── Login ─────────────────────────────────────────────────────────────────

  async login(dto: LoginDto, ipAddress: string): Promise<AuthTokens> {
    const user: UserRecord | null = null;

    if ('email' in dto && dto.email) {
      // TODO: Implement once User model exists in Sprint 1
      this.logger.debug({ email: dto.email }, 'Login attempt via email');
    } else if ('familyNumber' in dto && dto.familyNumber) {
      // TODO: Implement once Family/User model exists in Sprint 1
      this.logger.debug({ familyNumber: dto.familyNumber }, 'Login attempt via family number');
    }

    // Stub: For Sprint 0, return a mock/throw — real implementation in Sprint 1
    if (!user) {
      this.logger.warn('Auth stub: user lookup not yet implemented — no DB models');

      await this.auditService.log({
        action: AuditAction.LOGIN,
        entity: 'User',
        ipAddress,
        after: {
          method: 'email' in dto ? 'email' : 'familyNumber',
          success: false,
          reason: 'stub',
        },
      });

      throw new UnauthorizedException('Invalid credentials');
    }

    const currentUser: UserRecord = user;

    if (!currentUser.isActive) {
      throw new UnauthorizedException('Account is deactivated. Please contact the parish office.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, currentUser.passwordHash ?? '');
    if (!isPasswordValid) {
      await this.auditService.log({
        userId: currentUser.id,
        action: AuditAction.LOGIN,
        entity: 'User',
        entityId: currentUser.id,
        ipAddress,
        after: { success: false, reason: 'invalid_password' },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.createSession(
      currentUser.id,
      currentUser.email,
      currentUser.role,
      currentUser.familyId,
      ipAddress,
    );

    await this.auditService.log({
      userId: currentUser.id,
      action: AuditAction.LOGIN,
      entity: 'User',
      entityId: currentUser.id,
      ipAddress,
      after: { success: true },
    });

    return tokens;
  }

  // ─── Token Refresh ─────────────────────────────────────────────────────────

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    await this.auditService.log({
      userId: payload.sub,
      action: AuditAction.TOKEN_REFRESH,
      entity: 'Session',
      entityId: payload.sessionId,
    });

    return this.createSession(
      payload.sub,
      payload.email,
      payload.role,
      payload.familyId,
      '',
      payload.sessionId,
    );
  }

  // ─── Logout ────────────────────────────────────────────────────────────────

  async logout(sessionId: string): Promise<void> {
    await this.auditService.log({
      action: AuditAction.LOGOUT,
      entity: 'Session',
      entityId: sessionId,
    });
    this.logger.info({ sessionId }, 'Session revoked');
  }

  async logoutAll(userId: string): Promise<void> {
    await this.auditService.log({
      userId,
      action: AuditAction.LOGOUT,
      entity: 'Session',
      after: { scope: 'all_devices' },
    });
    this.logger.info({ userId }, 'All sessions revoked');
  }

  // ─── Sessions ──────────────────────────────────────────────────────────────

  async getSessions(_userId: string): Promise<unknown[]> {
    return [];
  }

  // ─── Password Reset ───────────────────────────────────────────────────────

  async forgotPassword(email: string): Promise<void> {
    this.logger.debug({ email }, 'Forgot password requested (stub)');
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    if (!token || !newPassword) {
      throw new BadRequestException('Token and new password are required');
    }
    this.logger.debug('Password reset stub — not yet implemented');
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private async createSession(
    userId: string,
    email: string | null,
    role: string,
    familyId: string | null,
    _ipAddress: string,
    existingSessionId?: string,
  ): Promise<AuthTokens> {
    const sessionId = existingSessionId ?? crypto.randomUUID();

    const jwtPayload: Omit<JwtPayload, 'iat' | 'exp'> = {
      sub: userId,
      email,
      role: role as JwtPayload['role'],
      familyId,
      sessionId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: this.configService.get<number>('jwt.accessExpiresIn'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
        expiresIn: this.configService.get<number>('jwt.refreshExpiresIn'),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  async validatePassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
