
# [Avalanche Canada](https://github.com/avalanchedotca/AvalancheCanada.git) 

[![Codeship Status for avalanchedotca/AvalancheCanada](https://www.codeship.io/projects/174bbac0-1b8b-0132-59d0-32ae1850d3a7/status)](https://www.codeship.io/projects/34957)
[![dependencies] (https://david-dm.org/avalanche-canada/ac-web.png)](https://david-dm.org/)

Web app and RESTful API as used by Avalanche Canada 
Contact admin@avalanche.ca for more details or to get invoved.  


## Technical Architecture

### system diagram
![image of system diagram](/docs/images/systems-diagram.png?raw=true)

### system components
* aws-elastic beanstalk - is the deployment environment for ac-web.  It creates and manages the ec2 servers, security groups, and load balanching for ac-web.  
* ac-web is the node.js + express app which provides the /forecasts api and /observations api
* aws-elasticache (redis) supports /forecasts api and stores the forecast cache for node-webcache with the node-webcache-redis adapter.  These facilities seed and update the forecasts from the legacy avalx server.  They then provide the forecasts to ac-web **quickly**.  
* aws-dynamodb supports /observatons api and stores the *mountain-info-network* and *mountain-info-network-qa* DynamoDB tables.  These tables store and serve the user contributed mountain information network submissions.  DynamoDB can be easily and readily scaled by modifying the Provisioned Throughput *Read and Write Capacity Units.*
* aws-s3 supports /observations api and stores the user images associated with user contributed mountain information network submissions.  The event chain can be seen below. 
![image /observations](/docs/images/observations.png?raw=true)

### saas dependencies
#### crirical dependencies
* [Mapbox](https://www.mapbox.com/) Provides the custom basemaps used in ac-web and ac-mobile
* [Prismi.io](https://prismic.io/) Provides Content Management for ac-web client.
* [Amazon Web Services](https://aws.amazon.com) Provides the infrastructure and components.
* [Auth0](http://auth0.com) Provides the identity managment and authentication systems. 
* [Google Analytics](https://www.google.com/analytics/) Provides the analyics tracking in ac-web and ac-mobile.

#### productivity dependencies
* [Github.com](https://github.com) Provides the version management and service hooks for continuous deployment.
* [Codeship.io](codeship.io) Provides the continuous deployment by hooking into Github.com and automatically building to Elastic Beanstalk. 


### client side dependencies
* Boilerplate scaffolded using Yeoman and the [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack).   
* [AngularJS](http://angularjs.org) .
* [Angular UI](http://angular-ui.github.io).  
* [Angular Bootstrap](http://angular-ui.github.io/bootstrap)
* [Font Awesome](http://fortawesome.github.com/Font-Awesome)  
* [Grunt](http://gruntjs.org)-based build system to ensure maximum productivity.  
* [Bower](http://bower.io/) package management
* [Compass](http://compass-style.org/)  
* [SASS](http://sass-lang.com/) 
* [AC-COMPONENTS](https://github.com/avalanche-canada/ac-components) Re-Usable components developed by Avalanche Canada
* [Leaflet](http://leafletjs.com/) Mobile Friendly Interactive Maps

### server side dependencies
* NodeJS
* ExpressJS


## Prerequisites
The RESTful api uses a few external resource which need to be configured.

**AWS Resources:** which means you will need an AWS key/pair set in order to use these resource. There are a numbers of strategies to pass in credentials as described in the [AWS NodeJS Configuration Guide](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html).

**Auth0:**
In order to be able to parse the jwt on the server we need to configure the express-jwt middleware by passing in our Auth0 application client information. 

**Redis:**
The application uses Redis as a caching layer. Redis need to be installed and running on localhost port 6379. The redis host is defined using environment variables.


#### Local Development
For development the recommended startegy is to use profiles via ``~/.aws/credentials`` file.

````
[default] ; the default profile
aws_access_key_id = ...
aws_secret_access_key = ...

[personal-account] ; my "avalanche-canada" profile
aws_access_key_id = ...
aws_secret_access_key = ...

````

For development add a ``.env`` file in the project root with the following contents:
````
AWS_PROFILE=avalanche-canada
SESSION_SECRET=mysessionsecret
AUTH0_CLIENT_ID=myauth0clientid
AUTH0_CLIENT_SECRET=myauth0clientsecret
REDIS_HOST='127.0.0.1'
NO_CACHE_REFRESH=true
MINSUB_DYNAMODB_TABLE='mountain-info-network'
````

The ``NO_CACHE_REFRESH`` environment variable controls wether the cache refreshes on a specified interval set in the application. For local and dev env its recommended to leave this to true.

### Quick Start

Install Node.js and Ruby then:

````sh
$ gem install compass
$ sudo npm -g install grunt-cli karma bower 
$ npm install
$ bower install
$ grunt serve
````

To run jslint to check javascript quality run:
````sh
grunt jshint
````

#### Configuring AWS environments

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

The follwing environment variables also need to be set on the server:
````
SESSION_SECRET=mysessionsecret
AUTH0_CLIENT_ID=myauth0clientid
AUTH0_CLIENT_SECRET=myauth0clientsecret
REDIS_HOST='yourredishost'
NO_CACHE_REFRESH=true
MINSUB_DYNAMODB_TABLE='dynamotablename'
````
