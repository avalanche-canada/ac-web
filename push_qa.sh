#!/bin/sh
 

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 349501831018.dkr.ecr.us-west-2.amazonaws.com

docker login

npm install

make build

docker build -t ac-web-qa .

docker tag ac-web-qa:latest 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-qa:latest

docker push 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-qa:latest

aws ecs update-service --cluster AvCan --service ac-web-qa --force-new-deployment