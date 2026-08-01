# Sprint 0 — Project Constitution

**Status: FROZEN. These rules cannot be changed without an explicit architecture decision record (ADR).**

---

## 18 Frozen Architecture Standards

### 1. Reverse Proxy & Edge Topology
- All external HTTP(S) traffic passes through Nginx reverse proxy before hitting application containers.
- Topology: `Browser → Nginx (Port 80/443) → Next.js (Port 3000) / NestJS API (Port 3001)`
- Nginx handles SSL termination, Gzip/Brotli compression, static file caching, and rate-limiting.

### 2. Redis Infrastructure
- Redis 7 is required and active from day one.
- Uses: JWT revocation blacklist, session cache, rate-limiting counters, OTP storage, and temporary locking.

### 3. Asynchronous Queue System (BullMQ)
- All background tasks (Email, SMS, Audit events, Image processing) **MUST** run via BullMQ workers.
- Synchronous dispatch of notifications or heavy jobs is prohibited on main HTTP request handlers.

### 4. Cloud Storage Strategy
- Files are **NEVER** stored directly on local application server filesystems in production.
- All uploads use S3 / Cloudflare R2 / Cloudinary storage abstractions (`StorageService`).
- Database stores only metadata (`id`, `url`, `key`, `mimeType`, `sizeBytes`, `bucket`).

### 5. Strict Configuration Management
- Environment variables are validated on startup via Zod schemas in `@nestjs/config`.
- Direct `process.env` access is strictly banned outside `src/config/`.

### 6. API Versioning
- All REST endpoints are prefixed with `/api/v1/`.
- `/api/v1/` is frozen permanently. Breaking changes require `/api/v2/`.

### 7. Unified API Envelope Standard
- **Success Format**: `{ success: true, data, meta?, timestamp, requestId }`
- **Error Format**: `{ success: false, code, message, details?, timestamp, requestId }`

### 8. Request Tracing & Correlation (UUID v7)
- Every incoming HTTP request is assigned a UUID v7 (`X-Request-ID`).
- Request ID is automatically injected into Pino loggers, response headers, and audit entries.

### 9. Identifier Strategy (UUID v7)
- All database primary keys use time-ordered UUID v7 for optimal index locality and B-tree performance.

### 10. Financial Representation (Integer Paise)
- Monetary amounts are **NEVER** represented using floating-point numbers (`number`).
- All currency amounts are stored and calculated as positive integers representing **Paise** (e.g. ₹500.00 = `50000`).

### 11. Payment State Machine
Explicit state transitions:
`CREATED → PENDING → AUTHORIZED → CAPTURED → VERIFIED → RECEIPT_GENERATED → COMPLETED`
(Exception states: `FAILED`, `REFUNDED`).

### 12. Request State Machine
Explicit state transitions:
`DRAFT → SUBMITTED → ASSIGNED → UNDER_REVIEW → APPROVED → SCHEDULED → COMPLETED`
(Exception states: `REJECTED`, `CANCELLED`).

### 13. Contextual Pino Logging
- Log levels: `DEBUG`, `INFO`, `WARN`, `ERROR`, `FATAL`.
- Every log context must include: `{ userId, familyId, requestId, ipAddress, userAgent }`.

### 14. Security Headers & Hardening
- Helmet security headers enabled: HSTS, Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.

### 15. Testing Coverage Thresholds
- Monorepo overall test coverage minimum: **80%**.
- Auth (`src/modules/auth`) and Payment (`src/modules/payment`) coverage minimum: **100%**.

### 16. Database Seed Framework
- Database seed script at `apps/api/prisma/seed.ts` provisions system roles, permissions, default Super Admin, Parish Priest, Anbiyams, Payment Categories, and CMS defaults.

### 17. Feature Flags System
- Experimental features or optional parish modules (e.g., Marriage Portal, Livestream) are controlled via `FeatureFlagService` and `@RequireFeature('FLAG_NAME')` guard.

### 18. Application Monitoring & Health
- Health indicators exposed at `/health`, `/health/db`, `/health/redis`, `/health/storage`, `/health/payment`.
