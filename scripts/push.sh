#!/usr/bin/env bash
#
# Push the planbsecurity-www image to Docker Hub.
# Pushes both the requested tag and the git-SHA tag produced by build.sh.
#
# Usage:
#   scripts/push.sh [TAG]
#
# Env overrides:
#   IMAGE  full image repo (default: loves2splug/planbsecurity-www)
#
set -euo pipefail

cd "$(dirname "$0")/.."

IMAGE="${IMAGE:-loves2splug/planbsecurity-www}"
TAG="${1:-${TAG:-latest}}"
GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo unknown)"

echo ">> Pushing ${IMAGE}:${TAG}"
docker push "${IMAGE}:${TAG}"

if [ "${GIT_SHA}" != "unknown" ]; then
  echo ">> Pushing ${IMAGE}:${GIT_SHA}"
  docker push "${IMAGE}:${GIT_SHA}"
fi

echo ">> Done."
