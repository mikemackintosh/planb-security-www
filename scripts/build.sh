#!/usr/bin/env bash
#
# Build the planbsecurity-www container image.
# The static site is compiled from source *inside* the Docker build — no local Node needed.
#
# Usage:
#   scripts/build.sh [TAG]
#
# Env overrides:
#   IMAGE     full image repo (default: loves2splug/planbsecurity-www)
#   PLATFORM  target platform(s), e.g. linux/amd64,linux/arm64 (default: linux/amd64)
#
set -euo pipefail

cd "$(dirname "$0")/.."

IMAGE="${IMAGE:-loves2splug/planbsecurity-www}"
TAG="${1:-${TAG:-latest}}"
PLATFORM="${PLATFORM:-linux/amd64}"

# Tag the image with the current git short SHA too, when available.
GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"

echo ">> Building ${IMAGE}:${TAG} (platform: ${PLATFORM}, sha: ${GIT_SHA})"

docker build \
  --platform "${PLATFORM}" \
  --tag "${IMAGE}:${TAG}" \
  --tag "${IMAGE}:${GIT_SHA}" \
  .

echo ">> Built:"
echo "   ${IMAGE}:${TAG}"
echo "   ${IMAGE}:${GIT_SHA}"
