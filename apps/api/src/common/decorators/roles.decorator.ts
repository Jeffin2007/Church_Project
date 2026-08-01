import { SetMetadata } from '@nestjs/common';

import type { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';

/**
 * Marks a route as requiring specific roles.
 *
 * @example
 * @Roles(Role.ADMIN, Role.SUPER_ADMIN)
 * @Get('admin-only')
 */
export const Roles = (...roles: Role[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
