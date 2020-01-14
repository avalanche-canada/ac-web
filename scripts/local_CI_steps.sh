#!/bin/sh
set -e

#
# This script *should* execute the buld steps in a similar way to the CI flow
# going to production:
#  (On CI server)
#  1. Use node v8 to install prod + dev dependecies
#  2. Do a front end build w/ webpack
#  3. Bundle dist/ directory with front end artifacts
#  (On Elastic beanstalk server)
#  4. Use node v4.4.3 :(
#  5. Do a prodution only install
#  6. run (hopefully)


#load nvm
. "$HOME/.nvm/nvm.sh"

# do dev things
echo '>>> nvm use v8'
nvm use v8
echo '>>> npm install'
npm install

echo '>>> make build'
make build

#clean
echo '>>> rm -rf ./node_modules'
rm -rf ./node_modules

#do prod install
echo ">>> nvm use 'v4.4.3'"
nvm use 'v4.4.3'
echo ">>> cd dist"
cd dist

echo ">>> npm --production install"
npm --production install
npm start
