# Sprint 0 — Project Constitution

**Status: FROZEN. These rules cannot be changed without an explicit architecture decision record (ADR).**

---

## Code Quality

| Rule       | Standard                                            |
| ---------- | --------------------------------------------------- |
| TypeScript | Strict mode — `any` is a lint error, not a warning  |
| ESLint     | Zero warnings policy — CI hard-fails on any warning |
| Prettier   | Enforced on commit via Husky                        |
| Comments   | Required on all public service methods              |

---

## Architecture

| Rule        | Standard                                    |
| ----------- | ------------------------------------------- |
| Pattern     | Feature-based modules + layered services    |
| Components  | Server-first, reusable, no duplicated logic |
| API         | REST only — no GraphQL without ADR          |
| Controllers | Receive → Validate → Call Service → Return  |
| Services    | Business logic only — no HTTP, no Prisma    |
| Prisma      | Database only — called from services        |
| DTOs        | Validation only — no business logic         |

---

## Security

| Rule       | Standard                                                     |
| ---------- | ------------------------------------------------------------ |
| Passwords  | bcrypt, cost factor 12                                       |
| Validation | Every input validated at API boundary                        |
| RBAC       | `@Roles()` + `RolesGuard` — no ad-hoc permission checks      |
| SQL        | Prepared statements via Prisma — no raw SQL unless justified |
| Transport  | HTTPS only in production                                     |
| Cookies    | HttpOnly + Secure + SameSite=Strict in production            |
| Audit      | Every write operation must call `AuditService.log()`         |

---

## Database

| Rule         | Standard                                              |
| ------------ | ----------------------------------------------------- |
| ORM          | Prisma only                                           |
| Raw SQL      | Only if Prisma cannot express it — must be documented |
| Migrations   | Every schema change via `prisma migrate dev`          |
| Soft Delete  | `deletedAt: DateTime?` pattern on mutable entities    |
| Primary Keys | UUID v4 everywhere — no auto-increment integers       |

---

## API Standards

| Rule       | Standard                                         |
| ---------- | ------------------------------------------------ |
| Format     | REST + JSON                                      |
| Casing     | camelCase                                        |
| IDs        | UUID v4                                          |
| Dates      | ISO 8601 (UTC)                                   |
| Errors     | RFC 7807 Problem Details                         |
| Versioning | `/api/v1/` — bump to v2 only on breaking changes |
| Pagination | `{ page, pageSize, total, totalPages }`          |

---

## Git

| Rule      | Standard                                        |
| --------- | ----------------------------------------------- |
| Branching | `main ← develop ← feature/*`                    |
| Commits   | Conventional Commits format (enforced by Husky) |
| Reviews   | All PRs require at least 1 approval             |
| CI        | All CI checks must pass before merge            |

---

## Definition of Done

Every feature must satisfy ALL of the following:

- [ ] Compiles with zero TypeScript errors
- [ ] Zero ESLint warnings
- [ ] Responsive on mobile and desktop
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Unit tests written (≥80% coverage)
- [ ] Documentation updated
- [ ] Audit logging added for all write operations
- [ ] PR reviewed and approved

---

## Role Hierarchy (frozen)

```
SUPER_ADMIN
  ↓
PARISH_PRIEST
  ↓
ADMIN
  ↓
OFFICE_STAFF
  ↓
ANBIYAM_LEADER
  ↓
MINISTRY_COORDINATOR
  ↓
FAMILY_HEAD
  ↓
FAMILY_MEMBER
```

Higher roles inherit all permissions of lower roles.
