# Queen of All Saints — Church Management System

> A production-ready parish management platform for Queen of All Saints Roman Catholic Church.

---

## 📋 Project Overview

| Layer    | Technology                                     |
| -------- | ---------------------------------------------- |
| Monorepo | pnpm workspaces + Turborepo                    |
| Frontend | Next.js (App Router) + TypeScript Strict       |
| Backend  | NestJS + TypeScript Strict                     |
| Database | PostgreSQL + Prisma ORM                        |
| Auth     | JWT + Refresh Tokens + HttpOnly Cookies + RBAC |
| Logging  | Pino + Request IDs + Structured Logs           |
| UI       | Tailwind CSS + shadcn/ui                       |
| Testing  | Jest + Vitest + Playwright                     |
| DevOps   | Docker + Husky + Commitlint + GitHub Actions   |

---

## 🏗️ Repository Structure

```
queen-of-all-saints/
├── apps/
│   ├── web/               # Next.js frontend (port 3000)
│   └── api/               # NestJS REST API (port 3001)
├── packages/
│   ├── types/             # Shared TypeScript types
│   ├── constants/         # Shared constants
│   ├── validation/        # Shared Zod schemas
│   ├── shared/            # Shared utilities
│   ├── ui/                # Shared component library
│   └── config/
│       ├── eslint-config/ # ESLint configs
│       └── tsconfig/      # TypeScript configs
├── docs/                  # Project documentation
└── docker-compose.yml     # Development environment
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- Docker + Docker Compose

### Development

```bash
# Install dependencies
pnpm install

# Start the full development environment
docker-compose up

# Or run services individually
pnpm dev
```

### Services

| Service    | URL                            |
| ---------- | ------------------------------ |
| Web App    | http://localhost:3000          |
| API        | http://localhost:3001/api/v1   |
| Swagger    | http://localhost:3001/api/docs |
| PostgreSQL | localhost:5432                 |
| Redis      | localhost:6379                 |

---

## 🗄️ Database

```bash
# Generate Prisma client
cd apps/api && pnpm prisma:generate

# Run migrations
pnpm prisma:migrate

# Open Prisma Studio
pnpm prisma:studio
```

---

## 🧪 Testing

```bash
pnpm test           # Unit tests (all packages)
pnpm test:cov       # Coverage report
pnpm test:e2e       # Playwright e2e tests
```

---

## 📐 Architecture Rules

1. **Controllers** — receive request, validate, call service, return response
2. **Services** — business logic only, no HTTP concerns
3. **Prisma** — database only, called from services
4. **DTOs** — validation only
5. **AuditService** — called for every write operation
6. No `any` — TypeScript strict mode enforced

---

## 🔐 Authentication

- **Access Token** — 15 min JWT, stored in HttpOnly cookie
- **Refresh Token** — 7 day JWT, stored in HttpOnly cookie (path-scoped)
- **Session Table** — server-side session tracking for revocation
- **Family Number** — alternative login for families (QOAS-YYYY-NNNN)

### RBAC Roles (highest → lowest)

```
SUPER_ADMIN → PARISH_PRIEST → ADMIN → OFFICE_STAFF
→ ANBIYAM_LEADER → MINISTRY_COORDINATOR → FAMILY_HEAD → FAMILY_MEMBER
```

---

## 🎨 Design System

| Token        | Value                 |
| ------------ | --------------------- |
| Primary      | Deep Red `#8B1A1A`    |
| Secondary    | Marian Blue `#1B3F8B` |
| Accent       | Gold `#C5973A`        |
| Heading Font | Playfair Display      |
| Body Font    | Inter                 |

---

## 📝 Commit Convention

Uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint:

```
feat(auth): add family number login
fix(api): handle invalid refresh token gracefully
docs(readme): update quick start instructions
```

---

## 🌿 Git Branching

```
main (production)
  └── develop (staging)
        └── feature/sprint-1-auth
        └── feature/sprint-1-family
        └── fix/login-validation
```

---

## 📜 Project Constitution

These rules are **frozen** and must not be changed without explicit decision:

- TypeScript strict mode — `any` is a lint error
- Zero ESLint warnings — CI fails on any warning
- Prisma only for database — no raw SQL
- UUID primary keys everywhere
- Soft delete pattern (`deletedAt`)
- Passwords hashed with bcrypt (cost 12)
- Every schema change via Prisma migration
- API versioned from day one (`/api/v1/`)
- RFC 7807 Problem Details for all errors
- Every write operation audited
