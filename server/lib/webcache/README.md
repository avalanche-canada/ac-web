node-webcache
=============

A very simple web cache to patch or speed up your endpoints. You simply pass in some url's and options and it will cache those results and can be retreived by a simple get call passing in the url you want. You can use the webcache in two modes; basic seed ro refreshing seed based on a refresh interval passed into the options.


###Installing

``npm install tesera/node-webcache``

###Usage
````js
var WebCache = require('webcache');

// passing one url
var webCache = new WebCache(['http://tesera.com']);
webCache.seed().then(function () {
    console.log(webCache.get('http://tesera.com'));
});

// you can pass in as many as you want
var webCache = new WebCache(['http://tesera.com', 'http://google.com']);
webCache.seed().then(function () {
    console.log(webCache.get('http://google.com'));
});

// We the cache will re-seed every 10 minutes
var webCache = new WebCache(['http://tesera.com'], 120000);
````

###Roadmap

* add options to specify store source
* add events


