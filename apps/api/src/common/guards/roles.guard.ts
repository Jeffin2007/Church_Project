import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import type { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ROLE_HIERARCHY } from '@qoas/constants';

/**
 * RBAC Roles Guard — checks that the authenticated user has sufficient role.
 * Uses role hierarchy: SUPER_ADMIN > PARISH_PRIEST > ADMIN > ... > FAMILY_MEMBER
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // No @Roles() decorator — allow all authenticated users
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const userRoleIndex = ROLE_HIERARCHY.indexOf(user.role as (typeof ROLE_HIERARCHY)[number]);
    const hasRole = requiredRoles.some((requiredRole) => {
      const requiredRoleIndex = ROLE_HIERARCHY.indexOf(
        requiredRole as (typeof ROLE_HIERARCHY)[number],
      );
      return userRoleIndex >= requiredRoleIndex;
    });

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied. Required: ${requiredRoles.join(' or ')}. Current: ${user.role}`,
      );
    }

    return true;
  }
}
