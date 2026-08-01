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
  id: string; // UUID v7
  email: string | null;
  phone: string | null;
  role: Role;
  familyId: string | null;
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface UserSession {
  id: string; // UUID v7
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

// ─── Standardized API Response & Error Envelopes ─────────────────────────────

export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
  timestamp: string; // ISO 8601
  requestId: string;
}

export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  details?: Record<string, string[]> | null;
  timestamp: string; // ISO 8601
  requestId: string;
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

// ─── Payment State Machine ───────────────────────────────────────────────────

export enum PaymentState {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  CAPTURED = 'CAPTURED',
  VERIFIED = 'VERIFIED',
  RECEIPT_GENERATED = 'RECEIPT_GENERATED',
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
  /** Amount in integer Paise (e.g. ₹500.00 = 50000) */
  amountPaise: number;
  state: PaymentState;
  reference: string | null;
  notes: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Request State Machine ───────────────────────────────────────────────────

export enum RequestState {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  ASSIGNED = 'ASSIGNED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum RequestType {
  BAPTISM = 'BAPTISM',
  CONFIRMATION = 'CONFIRMATION',
  FIRST_COMMUNION = 'FIRST_COMMUNION',
  MARRIAGE = 'MARRIAGE',
  DEATH_CERTIFICATE = 'DEATH_CERTIFICATE',
  BAPTISM_CERTIFICATE = 'BAPTISM_CERTIFICATE',
  OTHER = 'OTHER',
}

export interface SacramentRequest {
  id: string;
  familyId: string;
  type: RequestType;
  state: RequestState;
  assignedToId: string | null;
  notes: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Feature Flags ────────────────────────────────────────────────────────────

export enum FeatureFlag {
  MARRIAGE_PORTAL = 'MARRIAGE_PORTAL',
  LIVESTREAM = 'LIVESTREAM',
  ONLINE_DONATIONS = 'ONLINE_DONATIONS',
  SMS_NOTIFICATIONS = 'SMS_NOTIFICATIONS',
  CERTIFICATE_GENERATION = 'CERTIFICATE_GENERATION',
}
