# syntax=docker/dockerfile:1

# ---- Build stage: compile the static site from source ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first to leverage layer caching.
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

# Build the static assets into /app/dist
COPY . .
RUN yarn build

# ---- Runtime stage: serve the compiled site ----
# nginx-unprivileged runs as a non-root user (uid 101) and listens on 8080,
# which plays nicely with Kubernetes restricted securityContexts.
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Static assets + server config
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
