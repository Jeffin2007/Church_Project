import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { JwtPayload } from '../interfaces/jwt-payload.interface';

/**
 * Extracts the authenticated user from the request.
 *
 * @example
 * @Get('me')
 * getProfile(@CurrentUser() user: JwtPayload) { ... }
 */
export const CurrentUser = createParamDecorator(
  (
    data: keyof JwtPayload | undefined,
    ctx: ExecutionContext,
  ): JwtPayload | JwtPayload[keyof JwtPayload] => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();
    const user = request.user;
    return data ? user[data] : user;
  },
);
