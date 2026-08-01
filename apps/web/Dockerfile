# ─── Next.js Web Dockerfile ───────────────────────────────────────────────────
# Multi-stage: development | builder | production (standalone)

FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@9

# ─── Development ──────────────────────────────────────────────────────────────
FROM base AS development
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/config ./packages/config/
COPY packages/types ./packages/types/
COPY packages/constants ./packages/constants/
COPY packages/validation ./packages/validation/
RUN pnpm install --frozen-lockfile
COPY . .
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["pnpm", "dev"]

# ─── Builder ──────────────────────────────────────────────────────────────────
FROM base AS builder
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/config ./packages/config/
COPY packages/types ./packages/types/
COPY packages/constants ./packages/constants/
COPY packages/validation ./packages/validation/
RUN pnpm install --frozen-lockfile
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @qoas/web build

# ─── Production (Next.js standalone output) ───────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "apps/web/server.js"]
