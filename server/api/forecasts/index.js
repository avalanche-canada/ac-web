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

var acAvalxUrls = _.chain(regions.features).filter(function (feature) {
    return (feature.properties.type === 'avalx' || feature.properties.type === 'parks');
}).map(function (feature) {
    return feature.properties.url;
}).value();


var avalxWebcache = null;

if(process.env.REDIS_HOST) {
    var webcacheOptions ={ store: new WebCacheRedis(6379, process.env.REDIS_HOST) };
    if(!process.env.NO_CACHE_REFRESH) webcacheOptions.refreshInterval = 300000;
    avalxWebcache = new WebCache(webcacheOptions);
}
else {
    avalxWebcache = new WebCache();
}


avalxWebcache.seed(acAvalxUrls);


var DEBUG = console.log.bind(console);

// webcache middleware
router.use(function (req, res, next) {
    var url = req.protocol + '://' + req.headers.host + req.originalUrl;

    var webcacher = function (data) {
        DEBUG('NOT CACHING THIS THING: ', url);
    };

    req.webcache = webcacher;
    next();
});

router.param('region', function (req, res, next) {
    req.region = _.find(regions.features, {id: req.params.region});

    // Bail out if there is no region with that ID
    if (!req.region) {
        logger.log('info','forecast region not found');
        res.send(404);
        return next();
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
                return Q.nfcall(avalx.fetchCaamlForecast, req.region);   
            } else {
                DEBUG("USING CACHED CAAML");
                return cached_caaml;
            }
        }).then(function (caaml) {
            return [caaml, Q.nfcall(avalx.parseCaamlForecast, caaml, req.region)];
        }).spread(function(caaml, json) {

            DEBUG("THE JSON CALL WORKED");

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
            if(req.webcached) {
                res.send(req.webcached);
            } else {
                req.webcache(req.forecast.caaml);
                res.send(req.forecast.caaml);
            }
            break;
        case 'json':
            if(req.webcached) {
                try {
                    forecast = JSON.parse(req.webcached);
                } catch (e) {
                    logger.log('info','error parsing json forecast');
                    res.send(500);
                }

                res.json(forecast);
            } else {
                req.webcache(req.forecast.json);
                res.json(req.forecast.json);
            }
            break;
        case 'rss':
            if(req.webcached) {
                res.send(req.webcached);
            } else {
                locals = avalx.getTableLocals(req.forecast.json);

                res.render('forecasts/forecast-rss', locals, function (err, xml) {
                    if(err) {
                        res.send(500);
                    } else {
                        req.webcache(xml);
                        res.header('Content-Type', 'application/rss+xml');
                        res.send(xml)
                    }
                });
            }
            break;
        case 'html':
            if(req.webcached) {
                res.send(req.webcached);
            } else {
                locals = avalx.getTableLocals(req.forecast.json);
                res.render('forecasts/forecast-html', locals, function (err, html) {
                    if(err) {
                        res.send(500);
                    } else {
                        req.webcache(html);
                        res.send(html)
                    }
                });
            }
            break;
        default:
            res.send(404);
            break;
    }

});

router.get('/:region/nowcast.:format', function(req, res) {
    var styles;
    var mimeType = req.params.format === 'svg' ? 'image/svg+xml' : 'image/png';

    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', mimeType);

    if (req.region.properties.type === 'parks' || req.region.properties.type === 'avalx')
    {
        if(!req.webcached) {
            styles = avalx.getNowcastStyles(req.forecast.json);

            res.render('forecasts/nowcast', styles, function (err, svg) {
                if(err) {
                    res.send(500);
                } else {
                    switch(req.params.format) {
                        case 'svg':
                            req.webcache(svg);
                            res.send(svg);
                            break;
                        // case 'png':
                        //     var buf = new Buffer(svg);
                        //     gm(buf, 'nowcast.svg')
                        //         .options({imageMagick: true})
                        //         .resize(450, 150)
                        //         .stream('png')
                        //         .pipe(res);
                        //     break;
                        default:
                            res.send(404);
                            break;
                    }
                }
            });
        } else {
            res.send(req.webcached);
        }
    }else{
        res.send(404);
    }

});

router.get('/:region/danger-rating-icon.svg', function(req, res) {
    var ratingStyles = {
        alp: '',
        tln: '',
        btl: ''
    };

    if(!req.webcached) {

        var renderIcon = function(){
            res.render('forecasts/danger-icon', ratingStyles, function (err, svg) {
                if(err) {
                    res.send(500);
                } else {
                    res.header('Cache-Control', 'no-cache');
                    res.header('Content-Type', 'image/svg+xml');
                    req.webcache(svg);
                    res.send(svg)
                }
            });
        };

        if(req.region.properties.type === 'avalx' || req.region.properties.type === 'parks') {
            if(!req.webcached) {
                ratingStyles = avalx.getDangerIconStyles(req.forecast.json);
            }

            // Early season, Regular season, Spring situation, Off season
            if (req.forecast.json.dangerMode === 'Regular season' || req.forecast.json.dangerMode === 'Off season'){
                renderIcon();
            }
            else if (req.forecast.json.dangerMode === 'Early season' || req.forecast.json.dangerMode === 'Spring situation'){
                res.header('Cache-Control', 'no-cache');
                res.header('Content-Type', 'image/svg+xml');
                var url = 'http://www.avalanche.ca/assets/images/no_rating_icon.svg';
                request(url).pipe(res);
            }
            else{
                console.log("unknown danger mode");
                res.send(500);
            }
        }
        else{
            renderIcon();
        }

    } else {
        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'image/svg+xml');
        res.send(req.webcached);
    }

});

module.exports = router;
