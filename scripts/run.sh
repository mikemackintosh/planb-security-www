#!/usr/bin/env bash
#
# Run the built image locally for a quick smoke test.
# Serves on http://localhost:8080
#
# Usage:
#   scripts/run.sh [TAG]
#
# Env overrides:
#   IMAGE  full image repo (default: loves2splug/planbsecurity-www)
#   PORT   host port to bind (default: 8080)
#
set -euo pipefail

cd "$(dirname "$0")/.."

IMAGE="${IMAGE:-loves2splug/planbsecurity-www}"
TAG="${1:-${TAG:-latest}}"
PORT="${PORT:-8080}"

echo ">> Serving ${IMAGE}:${TAG} on http://localhost:${PORT}  (Ctrl-C to stop)"
exec docker run --rm -p "${PORT}:8080" --name planbsecurity-www "${IMAGE}:${TAG}"
