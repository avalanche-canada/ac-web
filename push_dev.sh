#!/bin/sh
 
docker build -t ac-web-dev .

docker tag ac-web-dev:latest 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-dev:latest

docker push 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-dev:latest