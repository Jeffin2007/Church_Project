import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { COOKIE_REFRESH_TOKEN } from '@qoas/constants';

import type { JwtPayload } from '../../../common/interfaces/jwt-payload.interface';

/**
 * Refresh Token Strategy — extracts refresh token from HttpOnly cookie.
 * Used ONLY on the POST /auth/refresh endpoint.
 */
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          return (request.cookies as Record<string, string>)[COOKIE_REFRESH_TOKEN] ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refreshSecret') ?? 'CHANGE_ME_REFRESH',
      passReqToCallback: true,
    });
  }

  validate(_req: Request, payload: JwtPayload): JwtPayload {
    if (!payload.sub || !payload.sessionId) {
      throw new UnauthorizedException('Invalid refresh token payload');
    }
    return payload;
  }
}
