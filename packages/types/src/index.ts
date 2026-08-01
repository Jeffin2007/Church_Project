/**
 * @qoas/types — Shared TypeScript type definitions
 * Used by both the API (NestJS) and Web (Next.js) apps.
 */

// ─── Role Enum ───────────────────────────────────────────────────────────────

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

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  role: Role;
  familyId: string | null;
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface UserSession {
  id: string;
  userId: string;
  deviceInfo: string | null;
  ipAddress: string | null;
  createdAt: string;
  expiresAt: string;
  lastUsedAt: string;
}

// ─── Family ───────────────────────────────────────────────────────────────────

export interface Family {
  id: string;
  familyNumber: string;
  name: string;
  address: string | null;
  anbiyam: string | null;
  ward: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyMember {
  id: string;
  familyId: string;
  name: string;
  dateOfBirth: string | null;
  gender: Gender;
  relation: string | null;
  phone: string | null;
  email: string | null;
  isBaptized: boolean;
  isConfirmed: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

// ─── API Response Wrapper ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  timestamp: string; // ISO 8601
}

export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ─── RFC 7807 Problem Details ─────────────────────────────────────────────────

export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  requestId?: string;
  timestamp: string; // ISO 8601
  errors?: Record<string, string[]>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: string; // userId
  email: string | null;
  role: Role;
  familyId: string | null;
  sessionId: string;
  iat: number;
  exp: number;
}

// ─── Audit ────────────────────────────────────────────────────────────────────

export enum AuditAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PASSWORD_RESET = 'PASSWORD_RESET',
  TOKEN_REFRESH = 'TOKEN_REFRESH',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export interface AuditLog {
  id: string;
  userId: string | null;
  action: AuditAction;
  entity: string;
  entityId: string | null;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  ipAddress: string | null;
  requestId: string | null;
  createdAt: string;
}

// ─── Ministry ────────────────────────────────────────────────────────────────

export interface Ministry {
  id: string;
  name: string;
  description: string | null;
  coordinatorId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Payment ─────────────────────────────────────────────────────────────────

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentType {
  DUES = 'DUES',
  DONATION = 'DONATION',
  SACRAMENT_FEE = 'SACRAMENT_FEE',
  OTHER = 'OTHER',
}

export interface Payment {
  id: string;
  familyId: string;
  type: PaymentType;
  amount: number;
  status: PaymentStatus;
  reference: string | null;
  notes: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Request ─────────────────────────────────────────────────────────────────

export enum RequestType {
  BAPTISM = 'BAPTISM',
  CONFIRMATION = 'CONFIRMATION',
  FIRST_COMMUNION = 'FIRST_COMMUNION',
  MARRIAGE = 'MARRIAGE',
  DEATH_CERTIFICATE = 'DEATH_CERTIFICATE',
  BAPTISM_CERTIFICATE = 'BAPTISM_CERTIFICATE',
  OTHER = 'OTHER',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}
