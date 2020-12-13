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

# nestjs
echo "switching to nestjs..."
pushd nestjs
npm ci
npx task fa:genesis
popd

echo "done!"
echo

echo "Commands to start:"
echo
echo "Hasura: \`npm start\`"
echo "Ionic: \`npm start\`"
echo "Nestjs: \`npm run start:dev\`"
