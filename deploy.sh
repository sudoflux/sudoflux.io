#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

DEPLOY_HOST="${DEPLOY_HOST:-sudoflux}"
REMOTE_STAGE="${REMOTE_STAGE:-/tmp/sudoflux.io-build}"
REMOTE_ROOT="${REMOTE_ROOT:-/var/www/sudoflux.io}"

echo "Building..."
npm run build

LOCAL_SHA="$(shasum -a 256 build/index.html | awk '{print $1}')"

echo "Staging static build on ${DEPLOY_HOST}:${REMOTE_STAGE}..."
rsync -av --delete build/ "${DEPLOY_HOST}:${REMOTE_STAGE}/"

echo "Deploying to ${DEPLOY_HOST}:${REMOTE_ROOT}..."
REMOTE_SHA="$(ssh "$DEPLOY_HOST" "
  set -euo pipefail
  sudo -n rsync -a --delete '${REMOTE_STAGE}/' '${REMOTE_ROOT}/'
  sudo -n nginx -t >/dev/null
  sudo -n sha256sum '${REMOTE_ROOT}/index.html' | awk '{print \$1}'
")"

if [[ "$LOCAL_SHA" != "$REMOTE_SHA" ]]; then
  echo "Homepage checksum mismatch after deployment" >&2
  echo "local:  $LOCAL_SHA" >&2
  echo "remote: $REMOTE_SHA" >&2
  exit 1
fi

echo "✓ Deployed and verified on ${DEPLOY_HOST} (${REMOTE_SHA})"
