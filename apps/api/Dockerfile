# ─── NestJS API Dockerfile ────────────────────────────────────────────────────
# Multi-stage build: development | builder | production

# ─── Base ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm@9

# ─── Development (hot-reload) ─────────────────────────────────────────────────
FROM base AS development
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/config ./packages/config/
COPY packages/types ./packages/types/
COPY packages/constants ./packages/constants/
COPY packages/validation ./packages/validation/
RUN pnpm install --frozen-lockfile
COPY . .
WORKDIR /app/apps/api
EXPOSE 3001
CMD ["pnpm", "dev"]

# ─── Builder ──────────────────────────────────────────────────────────────────
FROM base AS builder
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/config ./packages/config/
COPY packages/types ./packages/types/
COPY packages/constants ./packages/constants/
COPY packages/validation ./packages/validation/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @qoas/api build

# ─── Production ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./prisma

RUN npm install --omit=dev --ignore-scripts
RUN npx prisma generate

USER nestjs
EXPOSE 3001
CMD ["node", "dist/main"]
