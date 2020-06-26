#!/bin/sh
 
docker build -t ac-web-qa .

docker tag ac-web-qa:latest 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-qa:latest

docker push 349501831018.dkr.ecr.us-west-2.amazonaws.com/ac-web-qa:latest