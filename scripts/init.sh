set -e
. ~/.nvm/nvm.sh 
nvm install v4.4.3
nvm use v4.4.3
npm install npm@3.10.7 -g
npm config set registry http://registry.npmjs.org/
npm cache clean
npm install
