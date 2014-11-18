
# [Avalanche Canada](https://github.com/avalanchedotca/AvalancheCanada.git) 
[![Codeship Status for avalanchedotca/AvalancheCanada](https://www.codeship.io/projects/174bbac0-1b8b-0132-59d0-32ae1850d3a7/status)](https://www.codeship.io/projects/34957)
[![dependencies] (https://david-dm.org/avalanche-canada/ac-web.png)](https://david-dm.org/)
****

## Introduction
Website and rest API as used by Avalanche Canada 
Contact admin@avalanche.ca for more details or to get invoved.  
***

## Technical Architecture
Boilerplate scaffolded using Yeoman and the [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack).   
[AngularJS](http://angularjs.org) .
  
[Angular UI](http://angular-ui.github.io).  
[Angular Bootstrap](http://angular-ui.github.io/bootstrap)
[Font Awesome](http://fortawesome.github.com/Font-Awesome)  
[Grunt](http://gruntjs.org)-based build system to ensure maximum productivity.  
[Bower](http://bower.io/) package management
[Compass](http://compass-style.org/)  
[SASS](http://sass-lang.com/)  
***

## Modules

***

## Prerequisites
The observation api uses AWS resources which means you will need an AWS key/pair set in order to use these resource. There are a numbers of strategies to pass in credentials as described in the [AWS NodeJS Configuration Guide](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html). 

#### Development
For development the recommended startegy is to use profiles via ``~/.aws/credentials`` file.

````
[default] ; the default profile
aws_access_key_id = ...
aws_secret_access_key = ...

[personal-account] ; my "avalanche-canada" profile
aws_access_key_id = ...
aws_secret_access_key = ...

````

You can then pass set the AWS_PROFILE at the cli like: ``$ AWS_PROFILE=avalanche-canada grunt serve``

#### Production

For production the best practice is to use an ec2 instance profiles and set the required permissions on it using policies.

````
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1416283589000",
      "Effect": "Allow",
      "Action": [
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:ListTables",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:UpdateItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:myregion:mytable"
      ]
    },
    {
      "Sid": "Stmt1416283613000",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::mybucket/*"
      ]
    }
  ]
}
````
When using elastic beanstalk you can set the instance profile at environment creation using the console, cli or eb tool. You can also change the instance profile using the same tools at a later point.


## Quick Start

Install Node.js and Ruby then:

````sh
$ gem install compass
$ sudo npm -g install grunt-cli karma bower 
$ npm install
$ bower install
$ grunt serve
````
