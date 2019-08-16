#!/bin/bash

echo "removing node_modules"
cd ..
rm -rf node_modules/

echo "reinstalling production dependencies"
npm install --production
npm dedupe

npm install
docker build -t rximenes/service-mesh-tester:latest . -f build/service-mesh-tester.Dockerfile

echo "restoring node_modules to development mode"
rm -rf node_modules/
npm install
npm dedupe



