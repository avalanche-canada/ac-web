var _ = require('lodash');
var Q = require('q');
var express = require('express');
var router = express.Router();
var avalx = require('./avalx');
var regions = require('./forecast-regions');
var WebCache = require('webcache');
var WebCacheRedis = require('webcache-redis');
var gm = require('gm');
var moment = require('moment');
var request = require('request');
var logger = require('../../logger.js');
var config = require('../../config/environment');
var fs = require('fs');

// XXX: es6-promiseRequired to polyfill the cache-manager package
// When upgrading to a new version of node this may not be required
// (currently required on nodejs v0.10.26)
require('es6-promise');
var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');


var acAvalxUrls = _.chain(regions.features).filter(function (feature) {
    return (feature.properties.type === 'avalx' || feature.properties.type === 'parks');
}).map(function (feature) {
    return feature.properties.url;
}).value();


var avalxWebcache = null;
var fragmentCache = null; 

if(process.env.REDIS_HOST) {
    var webcacheOptions ={ store: new WebCacheRedis(6379, process.env.REDIS_HOST) };
    if(!process.env.NO_CACHE_REFRESH) webcacheOptions.refreshInterval = 300000 /*milliseconds*/;
    avalxWebcache = new WebCache(webcacheOptions);

    fragmentCache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST, // default value
        port: 6379, // default value
        db: 1,
        ttl: 60*5 /*seconds*/,
    });
}
else {
    avalxWebcache = new WebCache();
    fragmentCache = cacheManager.caching({store: 'memory', max: 100, ttl: 60*10/*seconds*/});
}

avalxWebcache.seed(acAvalxUrls);

var DEBUG = console.log.bind(console);

router.param('region', function (req, res, next) {
    req.region = _.find(regions.features, {id: req.params.region});

    // Bail out if there is no region with that ID
    if (!req.region) {
        logger.log('info','forecast region not found');
        res.status(404)
           .end("Not Found");
        return
    }



    if(req.region.properties.type === 'link') {
        req.forecast = {
            json: {
                id: req.region.id,
                name: req.region.properties.name,
                externalUrl: req.region.properties.url
            }
        };
        return next();
    }

    avalxWebcache.get(req.region.properties.url)
        .then(function (cached_caaml) {
            if(!cached_caaml) {
                DEBUG("BUILDING forecast caaml for region:", req.region.id);
                return Q.nfcall(avalx.fetchCaamlForecast, req.region);   
            } else {
                return cached_caaml;
            }
        }).then(function (caaml) {
            var cacheKey = 'forecast-data::json::' + req.region.id;
            var json = fragmentCache.wrap(cacheKey, function(){
                DEBUG("BUILDING forecast data...", cacheKey);
                return Q.nfcall(avalx.parseCaamlForecast, caaml, req.region);
            });
            return [caaml, json];
        }).spread(function(caaml, json) {


            if (req.region.properties.type === 'avalx'){
                json.bulletinTitle = req.region.properties.name;

            }else if (req.region.properties.type === 'parks'){
                json.parksUrl = req.region.properties.externalUrl;
                json.name        = req.region.properties.name;
            }

            return {
                region: req.region.id,
                caaml: caaml,
                json: json
            };

        }).then(function (forecast) {
            req.forecast = forecast;
            next();
        }).catch(function (e) {
            logger.log('error',e);
            res.send(500);
        }).done();

});

//! remove this route once we have updated the mobile app
router.get('/', function(req, res) {
    res.json(regions);
});

router.get('/areas', function(req, res) {
    res.json(areas);
});

router.get('/:region.:format', function(req, res) {
    req.params.format = req.params.format || 'json'
    var forecast;
    var locals;

    switch(req.params.format) {
        case 'xml':
            res.header('Content-Type', 'application/xml');
            res.send(req.forecast.caaml);
            break;

        case 'json':
            res.header('Content-Type', 'application/json');
            res.json(req.forecast.json);
            break;

        case 'rss':
            locals = avalx.getTableLocals(req.forecast.json);

            res.render('forecasts/forecast-rss', locals, function (err, xml) {
                if(err) {
                    res.send(500);
                } else {
                    res.header('Content-Type', 'application/rss+xml');
                    res.send(xml)
                }
            });
            break;
        case 'html':
            locals = avalx.getTableLocals(req.forecast.json);
            res.render('forecasts/forecast-html', locals, function (err, html) {
                if(err) {
                    res.send(500);
                } else {
                    //req.webcache(html);
                    res.send(html)
                }
            });
            break;
        default:
            res.send(404);
            break;
    }

});

router.get('/:region/nowcast.svg', function(req, res) {
    var styles;
    var mimeType = 'image/svg+xml';


    if (req.region.properties.type === 'parks' 
     || req.region.properties.type === 'avalx') {

        styles = avalx.getNowcastStyles(req.forecast.json);

        var cacheKey = "nowcast-image::" + req.region.id;
        fragmentCache.wrap(cacheKey, function(){
            DEBUG('BUILDING Nowcast image...', cacheKey);
            return Q.nfcall(res.render.bind(res), 'forecasts/nowcast', styles);
        }).then(function (svg) {
                res.set('Cache-Control', 'no-cache');
                res.set('Content-Type', mimeType);
                res.send(svg);
        }).catch(function(err) {
          console.log("Error generating nowcast:", err);
          res.send(500);
        });
        //.done();

    } else {
        res.send(404);
    }

});

router.get('/:region/danger-rating-icon.svg', function(req, res) {
    var ratingStyles = {
        alp: '',
        tln: '',
        btl: ''
    };

    // TODO(wnh): Remove this giant hack
    if(req.region.id === 'north-rockies')
    {
      console.log("Sending static conditions-report icon");
      res.sendFile(config.root + '/server/views/forecasts/conditions-report-icon.svg');
      return
    }

    var renderIcon = function(styles){
        res.render('forecasts/danger-icon', styles, function (err, svg) {
            if(err) {
                res.send(500);
            } else {
                res.header('Cache-Control', 'no-cache');
                res.header('Content-Type', 'image/svg+xml');
                res.send(svg)
            }
        });
    };

    ratingStyles = avalx.getDangerIconStyles(req.forecast.json);

    // Render Empty for Links
    if(req.region.properties.type === 'link') {
        renderIcon({
            alp: '',
            tln: '',
            btl: ''
        });
        return;
    }
    // Every other Region will be 'avalx' or 'parks'

 
    // Early season, Regular season, Spring situation, Off season
    if (req.forecast.json.dangerMode === 'Regular season' || req.forecast.json.dangerMode === 'Off season'){
        //renderIcon(ratingStyles);
        var cacheKey = 'danger-rating-icon::' + req.region.id;
        fragmentCache.wrap(cacheKey, function(){
            DEBUG('BUILDING danger-rating-icon...', cacheKey);
            return Q.nfcall(res.render.bind(res), 'forecasts/danger-icon', ratingStyles);
        }).then(function(svg){
            res.header('Cache-Control', 'no-cache');
            res.header('Content-Type', 'image/svg+xml');
            res.send(svg)
        }).catch(function(err){
            console.log("Error rendering danger rating:", err);
            res.status(500).send(err);
        });
    } else if (req.forecast.json.dangerMode === 'Early season' || req.forecast.json.dangerMode === 'Spring situation'){
        res.header('cache-control', 'no-cache');
        res.header('content-type', 'image/svg+xml');
        fs.createReadStream(config.root + '/server/views/forecasts/no_rating_icon.svg')
            .pipe(res);
    } else{
        console.log("ERROR: unknown danger mode: ", req.forecast.json.dangerMode);
        res.send(500);
    }

});

module.exports = router;
