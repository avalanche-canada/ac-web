var _ = require('lodash');
var Q = require('q');
var express = require('express');
var router = express.Router();
var regions = require('./hotzone-regions');
var WebCache = require('webcache');
var WebCacheRedis = require('webcache-redis');
var gm = require('gm');
var moment = require('moment');
var request = require('request');
var logger = require('../../logger.js');
var config = require('../../config/environment');

var acAvalxUrls = _.chain(regions.features).filter(function (feature) {
    return (feature.properties.type === 'avalx' || feature.properties.type === 'parks');
}).map(function (feature) {
    return feature.properties.url;
}).value();


var apiWebcache = null,
    avalxWebcache = null;

if(process.env.REDIS_HOST) {
    var webcacheOptions ={ store: new WebCacheRedis(6379, process.env.REDIS_HOST) };
    if(!process.env.NO_CACHE_REFRESH) webcacheOptions.refreshInterval = 300000;
    apiWebcache = new WebCache(webcacheOptions);
    avalxWebcache = new WebCache(webcacheOptions);
}
else {
    apiWebcache = new WebCache();
    avalxWebcache = new WebCache();
}


avalxWebcache.seed(acAvalxUrls);
avalxWebcache.on('refreshed', _.bind(apiWebcache.refresh, apiWebcache));

// webcache middleware
router.use(function (req, res, next) {
    var url = req.protocol + '://' + req.headers.host + req.originalUrl;

    var webcacher = function (data) {
        if(typeof data === 'object'){
            data = JSON.stringify(data);
        }
        apiWebcache.cacheUrl(url, data);
    };

    if(req.headers['cache-control'] === 'no-cache') {
        //console.log('cache bypass for %s', url);
        logger.log('info','cache bypass for', url);
        req.webcache = webcacher;
        next();
    } else {
        apiWebcache.get(url).then(function (data) {
            if(data){
                //console.log('cache hit for %s', url);
                //logger.log('info','cache hit for', url);
                apiWebcache.cacheUrl(url);
                req.webcached = data;
            } else {
                //console.log('cache miss for %s', url);
                logger.log('info','cache miss for', url);
                req.webcache = webcacher;
            }
            next();
        });
    }
});

router.param('region', function (req, res, next) {
    req.region = _.find(regions.features, {id: req.params.region});

    if(req.region && req.webcached) {
        res.send(req.region);
    } else {
        logger.log('info','hot zone region not found');
        res.send(404);
    }
});

router.get('/', function(req, res) {
    res.json(regions);
});

module.exports = router;
