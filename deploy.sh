#!/bin/bash
set -e
cd ~/repos/sudoflux.io
echo "Building..."
npm run build
echo "Deploying to /var/www/sudoflux.io..."
sudo rsync -av --delete build/ /var/www/sudoflux.io/
echo "✓ Deployed!"
