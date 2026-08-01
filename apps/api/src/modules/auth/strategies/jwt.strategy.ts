import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { COOKIE_ACCESS_TOKEN } from '@qoas/constants';

import type { JwtPayload } from '../../../common/interfaces/jwt-payload.interface';

/**
 * JWT Strategy — extracts access token from HttpOnly cookie.
 * Falls back to Authorization Bearer header for API clients.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1. Extract from HttpOnly cookie (primary)
        (request: Request): string | null => {
          return (request.cookies as Record<string, string>)[COOKIE_ACCESS_TOKEN] ?? null;
        },
        // 2. Fallback to Authorization Bearer header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessSecret') ?? 'CHANGE_ME',
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    if (!payload.sub || !payload.role) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return payload;
  }
}
