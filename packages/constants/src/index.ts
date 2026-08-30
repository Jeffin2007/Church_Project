/**
 * @qoas/constants — Shared application constants
 * Imported by both frontend and backend.
 */

// ─── API ──────────────────────────────────────────────────────────────────────

export const API_VERSION = 'v1' as const;
export const API_PREFIX = `api/${API_VERSION}` as const;

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const ACCESS_TOKEN_EXPIRY_SECONDS = 15 * 60; // 15 minutes
export const REFRESH_TOKEN_EXPIRY_DAYS = 7;
export const REFRESH_TOKEN_EXPIRY_SECONDS = REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60;
export const PASSWORD_RESET_TOKEN_EXPIRY_MINUTES = 30;
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_MINUTES = 15;
export const BCRYPT_ROUNDS = 12;

export const COOKIE_ACCESS_TOKEN = 'access_token' as const;
export const COOKIE_REFRESH_TOKEN = 'refresh_token' as const;

// ─── Pagination ───────────────────────────────────────────────────────────────

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ─── Family Number ────────────────────────────────────────────────────────────

/** Format: QOAS-YYYY-NNNN or QOAS-CARD-NNN or numeric card numbers (e.g. 101, QOAS-CARD-101, QOAS-2024-0001) */
export const FAMILY_NUMBER_REGEX = /^(?:QOAS-)?(?:CARD-)?(?:\d{4}-)?\w+$/i;
export const FAMILY_NUMBER_PREFIX = 'QOAS';

// ─── File Upload ──────────────────────────────────────────────────────────────

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf'] as const;

// ─── Soft Delete ──────────────────────────────────────────────────────────────

/** Prisma soft delete filter — always apply in queries */
export const NOT_DELETED = { deletedAt: null };

// ─── HTTP Headers ─────────────────────────────────────────────────────────────

export const HEADER_REQUEST_ID = 'X-Request-ID' as const;
export const HEADER_CORRELATION_ID = 'X-Correlation-ID' as const;

// ─── Roles — Permission Hierarchy ─────────────────────────────────────────────

/** Higher index = higher privilege level */
export const ROLE_HIERARCHY = [
  'FAMILY_MEMBER',
  'FAMILY_HEAD',
  'MINISTRY_COORDINATOR',
  'ANBIYAM_LEADER',
  'OFFICE_STAFF',
  'ADMIN',
  'PARISH_PRIEST',
  'SUPER_ADMIN',
] as const;

export type RoleHierarchy = (typeof ROLE_HIERARCHY)[number];

// ─── Regex Patterns ──────────────────────────────────────────────────────────

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+?[1-9]\d{9,14}$/;
export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// ─── App Metadata ─────────────────────────────────────────────────────────────

export const APP_NAME = 'Queen of All Saints' as const;
export const APP_SHORT_NAME = 'QOAS' as const;
export const SUPPORT_EMAIL = 'admin@queenofallsaints.in' as const;
