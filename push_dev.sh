#!/bin/sh
 
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 349501831018.dkr.ecr.us-west-2.amazonaws.com

docker login

npm install

make build

docker build -t ac-web-dev .

docker tag ac-web-dev:latest 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-dev:latest

docker push 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-dev:latest

aws ecs update-service --cluster AvCan --service ac-web-dev --force-new-deployment