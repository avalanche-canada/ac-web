set -e
. ~/.nvm/nvm.sh 
nvm install v8.4.0
nvm use v8.4.0
npm config set registry http://registry.npmjs.org/
npm cache clean
npm install
