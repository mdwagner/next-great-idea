#!/bin/bash
set -euo pipefail

source scripts/helpers.sh

# hasura
echo "switching to hasura..."
pushd hasura
npm ci
npm run migrate
popd

# ionic
echo "switching to ionic..."
pushd ionic
npm ci
popd

# lucky
echo "switching to lucky..."
pushd lucky
shards install
lucky fa.genesis
popd

echo "done!"
echo

echo "Commands to start:"
echo
echo "Hasura: \`npm start\`"
echo "Ionic: \`npm start\`"
echo "Lucky: \`hivemind\`"
