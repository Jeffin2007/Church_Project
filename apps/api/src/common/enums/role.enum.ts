/**
 * Role enum — frozen per Project Constitution.
 * Must match packages/types/src/index.ts Role enum exactly.
 */
export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  PARISH_PRIEST = 'PARISH_PRIEST',
  ADMIN = 'ADMIN',
  OFFICE_STAFF = 'OFFICE_STAFF',
  ANBIYAM_LEADER = 'ANBIYAM_LEADER',
  MINISTRY_COORDINATOR = 'MINISTRY_COORDINATOR',
  FAMILY_HEAD = 'FAMILY_HEAD',
  FAMILY_MEMBER = 'FAMILY_MEMBER',
}
