var _ = require('lodash');
var express = require('express');
var router = express.Router();
var avalx = require('./avalx');
var regions = require('./forecast-regions');
var WebCache = require('webcache');
var WebCacheRedis = require('webcache-redis');

var acAvalxUrls = _.chain(regions.features).filter(function (feature) {
    return feature.properties.type === 'avalx';
}).map(function (feature) {
    return feature.properties.url;
}).value();

var redisStore = new WebCacheRedis(6379, process.env.REDIS_HOST);
var webcacheOptions = {
    store: redisStore
};

if(!process.env.NO_CACHE_REFRESH) {
    webcacheOptions.refreshInterval = 600000; // 10 minutes
}

var webcache = new WebCache(acAvalxUrls, webcacheOptions);

if(process.env.NO_CACHE_REFRESH) {
    webcache.seed();
}

// webcache middleware
router.use(function (req, res, next) {
    var url = req.protocol + '://' + req.headers.host + req.originalUrl;
    // console.log(_.keys(req))
    var webcacher = function (data) {
        if(typeof data === 'object'){
            data = JSON.stringify(data);
        }
        webcache.cacheUrl(url, data);
    };

    if(req.query.fresh) {
        console.log('cache by-pass for %s', url);
        req.webcache = webcacher;
        next();
    } else {
        webcache.get(url).then(function (data) {
            if(data){
                console.log('cache hit for %s', url);
                req.webcached = data;
            } else {
                console.log('cache miss for %s', url);
                req.webcache = webcacher;
            }
            next();
        });
    }
});

router.param('region', function (req, res, next) {
    if(req.webcached) {
        next();
    } else {
        var regionId = req.params.region;
        var date = req.query.date;
        req.region = _.find(regions.features, {id: regionId});

        if(!date && req.region.properties.type === 'avalx') {
            if(req.region.properties.owner === 'avalanche-canada') {
                webcache.get(req.region.properties.url).then(function (data) {
                    req.forecast = {
                        region: regionId,
                        date: date,
                        caaml: data
                    };

                    if(req.forecast.caaml){
                        console.log('cache hit for forecast for %s', regionId);

                        avalx.parseCaamlForecast(req.forecast, req.region.properties.owner, function (jsonForecast) {
                            req.forecast.json = jsonForecast;
                            next();
                        }, function () {
                            console.log('error parsing %s caaml forecast.', regionId);
                            res.send(500);
                        });
                    } else {
                        console.log('cache miss for forecast for %s', regionId);
                    }
                });
            }

            if(!req.forecast || !req.forecast.xml || !req.forecast.json) {
                avalx.fetchCaamlForecast(req.region, date, function (caamlForecast) {
                    if(caamlForecast){
                        req.forecast = {
                            region: regionId,
                            date: date,
                            caaml: caamlForecast
                        };

                        avalx.parseCaamlForecast(req.forecast, req.region.properties.owner, function (jsonForecast) {
                            req.forecast.json = jsonForecast;
                            next();
                        }, function () {
                            console.log('error parsing %s caaml forecast.', regionId);
                            res.send(500);
                        });
                    }
                    else {
                        console.log(e);
                        res.send(500);
                    }
                }, function (e) {
                    console.log(e);
                    res.send(500);
                }); 
            }
        } else {
            req.forecast = {
                json: {
                    id: regionId,
                    name: req.region.properties.name,
                    externalUrl: req.region.properties.url
                }
            };
            next();
        }
    }
});


router.get('/', function(req, res) {
    res.json(regions);
});

router.get('/areas', function(req, res) {
    res.json(areas);
});

router.get('/:region/danger-rating-icon.svg', function(req, res) {
    var ratingStyles = {
        alp: '',
        tln: '',
        btl: ''
    };

    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', 'image/svg+xml');

    if(!req.webcached) {
        if(req.region.properties.type === 'avalx') {
            ratingStyles = avalx.getDangerIconStyles(req.forecast.json);
        }

        res.render('forecasts/danger-icon', ratingStyles, function (err, svg) {
            if(err) {
                res.send(500);
            } else {
                req.webcache(svg);
                res.send(svg)
            }
        });
    } else {
        res.send(req.webcached);
    }
});

router.get('/:region.:format', function(req, res) {
    req.params.format = req.params.format || 'json'

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
                res.send(req.webcached);
            } else {
                req.webcache(req.forecast.json);
                res.json(req.forecast.json);
            }
            break;
        case 'rss':
            if(req.webcached) {
                res.send(req.webcached);
            } else {
                var locals = {
                    url: "url", 
                    forecast: req.forecast.json
                };

                res.render('forecasts/forecast-rss', locals, function (err, xml) {
                    if(err) {
                        res.send(500);
                    } else {
                        req.webcache(xml);
                        res.send(xml)
                    }
                });
            }
            
            break;
        case 'html':
            var locals = { 
                forecast: req.forecast.json
            };

            res.render('forecasts/forecast-html', locals, function (err, html) {
                if(err) {
                    res.send(500);
                } else {
                    req.webcache(html);
                    res.send(html)
                }
            });
            break;
    }

});

router.get('/:region/nowcast.svg', function(req, res) {
    var ratingStyles;

    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', 'image/svg+xml');

    if(!req.webcached && req.region.properties.type === 'avalx') {
        ratingStyles = avalx.getNowcastStyles(req.forecast.json);

        res.render('forecasts/nowcast', ratingStyles, function (err, svg) {
            if(err) {
                res.send(500);
            } else {
                req.webcache(svg);
                res.send(svg)
            }
        });
    } else {
        res.send(req.webcached);
    }
});

module.exports = router;
