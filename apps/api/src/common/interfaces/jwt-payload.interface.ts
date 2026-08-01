import type { Role } from '@qoas/types';

export interface JwtPayload {
  /** User UUID */
  sub: string;
  email: string | null;
  role: Role;
  familyId: string | null;
  /** Session UUID — used for refresh token rotation */
  sessionId: string;
  iat: number;
  exp: number;
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
