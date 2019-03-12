var _ = require('lodash');
var Q = require('q');
var express = require('express');
var router = express.Router();
var avalx = require('./avalx');
var WebCache = require('../../lib/webcache');
var WebCacheRedis = require('../../lib/webcache-redis');
var moment = require('moment');
var request = require('request');
var logger = require('../../logger');
var config = require('../../config/environment');
var fs = require('fs');
var Prismic = require('prismic.io');

var regions = require('../../data/season').forecast_regions;

// XXX: es6-promiseRequired to polyfill the cache-manager package
// When upgrading to a new version of node this may not be required
// (currently required on nodejs v0.10.26)
require('es6-promise');

var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');

var acAvalxUrls = _.chain(regions.features)
    .filter(function(feature) {
        return (
            feature.properties.type === 'avalx' ||
            feature.properties.type === 'parks'
        );
    })
    .map(function(feature) {
        return feature.properties.url;
    })
    .value();

var avalxWebcache = null;
var fragmentCache = null;

if (process.env.REDIS_HOST) {
    var webcacheOptions = {
        store: new WebCacheRedis(6379, process.env.REDIS_HOST),
    };
    if (!process.env.NO_CACHE_REFRESH)
        webcacheOptions.refreshInterval = 300000 /*milliseconds*/;
    avalxWebcache = new WebCache(webcacheOptions);

    fragmentCache = cacheManager.caching({
        store: redisStore,
        host: process.env.REDIS_HOST, // default value
        port: 6379, // default value
        db: 1,
        ttl: 60 * 5 /*seconds*/,
    });
} else {
    avalxWebcache = new WebCache();
    fragmentCache = cacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: 60 * 10 /*seconds*/,
    });
}

avalxWebcache.seed(acAvalxUrls);

router.param('region', function(req, res, next) {
    req.region = _.find(regions.features, { id: req.params.region });

    // Bail out if there is no region with that ID
    if (!req.region) {
        logger.info(
            'forecast region not found url="' + req.originalUrl + '"'
        );
        return res.status(404).end('Not Found');
    }

    logger.debug('getting region:', req.params.region);
    getForecastData(req.params.region, req.region)
        .then(function(forecast) {
            req.forecast = forecast;
            return next();
        })
        .catch(function(e) {
            logger.error('loading region data:', e);
            res.send(500);
        })
        .done();
});

function getForecastData(regionName, region) {
    if (region.properties.type === 'link') {
        return Q.resolve({
            json: {
                id: region.id,
                name: region.properties.name,
                externalUrl: region.properties.url,
            },
        });
    } else if (region.properties.type === 'hotzone') {
        return Q.resolve(region.properties);
    }

    return avalxWebcache
        .get(region.properties.url)
        .then(function(cached_caaml) {
            if (!cached_caaml) {
                logger.debug('BUILDING forecast caaml for region:', region.id);
                return Q.nfcall(avalx.fetchCaamlForecast, region);
            } else {
                return cached_caaml;
            }
        })
        .then(function(caaml) {
            return [caaml];
        })
        .spread(function(caaml) {
            var cacheKey = 'forecast-data::json::' + region.id;
            var json = fragmentCache.wrap(cacheKey, function() {
                logger.debug('BUILDING forecast data...', cacheKey);
                return Q.nfcall(avalx.parseCaamlForecast, caaml, region);
            });
            return [caaml, json];
        })
        .spread(function(caaml, json) {
            if (region.properties.type === 'avalx') {
                json.bulletinTitle = region.properties.name;
            } else if (region.properties.type === 'parks') {
                json.parksUrl = region.properties.externalUrl;
                json.name = region.properties.name;
            }

            return {
                region: region.id,
                caaml: caaml,
                json: json,
            };
        });
}

//! remove this route once we have updated the mobile app
router.get('/', function(req, res) {
    res.json(regions);
});

router.get('/areas', function(req, res) {
    res.json(areas);
});

function isForecastRegion(r) {
    return (
        r.properties.type === 'parks' ||
        r.properties.type === 'avalx'
    );
}
function isLink(r) {
    return r.properties.type === 'link';
}
function isHotzone(r) {
    return r.properties.type === 'hotzone';
}

router.get('/ALL.json', function(req, res) {
    var fxPromises =
        _.chain(regions.features)
            .filter(isForecastRegion)
            .map(function(r) {
                var f = getForecastData(r.id, r);
                return f;
            })
            .value();
    Q.all(fxPromises).then(function(fxs){
        var fs = _.zipObject(
            _.map(fxs, function(f){ return f.json.region}),
            _.map(fxs, 'json')
        );
        res.status(200).json(fs);
    }).catch(function(err){
        res.status(500).json({err: "Error getting forecasts"});
    }).done();
});

router.get('/:region.:format', function(req, res) {
    req.params.format = req.params.format || 'json';
    var forecast;
    var locals;



    if (isHotzone(req.region) || isLink(req.region)) {
        return res.status(404).end('Region Not Found');
    }


    switch (req.params.format) {
        case 'xml':
            return res.type('application/xml').send(req.forecast.caaml);
            break;

        case 'json':
            return res.json(req.forecast.json);
            break;

        case 'rss':
            locals = avalx.getTableLocals(req.forecast.json);
            //TODO(wnh): Assert the failure mode for this hits the top level error handler
            return res.render('forecasts/forecast-rss', locals);
            break;

        case 'html':
            locals = avalx.getTableLocals(req.forecast.json);
            locals.AC_API_ROOT_URL = config.AC_API_ROOT_URL;
            res.render('forecasts/forecast-html', locals, function(err, html) {
                if (err) {
                    return res.status(500).end();
                } else {
                    return res.send(html);
                }
            });
            break;
        default:
            return res.status(404).end();
            break;
    }
});

router.get('/:region/nowcast.svg', function(req, res) {
    var styles;
    var mimeType = 'image/svg+xml';

    if (
        req.region.properties.type === 'parks' ||
        req.region.properties.type === 'avalx'
    ) {
        styles = avalx.getNowcastStyles(req.forecast.json);

        var cacheKey = 'nowcast-image::' + req.region.id;
        fragmentCache
            .wrap(cacheKey, function() {
                logger.debug('BUILDING Nowcast image...', cacheKey);
                return Q.nfcall(
                    res.render.bind(res),
                    'forecasts/nowcast',
                    styles
                );
            })
            .then(function(svg) {
                res.set('Cache-Control', 'no-cache');
                res.set('Content-Type', mimeType);
                res.send(svg);
            })
            .catch(function(err) {
                logger.error('generating nowcast svg:', err);
                res.send(500);
            });
        //.done();
    } else {
        res.send(404);
    }
});

router.get('/graphics/:alp/:tln/:btl/danger-rating-icon.svg', function(
    req,
    res
) {
    var colors = {
        1: avalx.dangerColors.green,
        2: avalx.dangerColors.yellow,
        3: avalx.dangerColors.orange,
        4: avalx.dangerColors.red,
        5: avalx.dangerColors.black,
        n: avalx.dangerColors.white,
    };
    var styles = {
        alp: colors[req.params.alp],
        tln: colors[req.params.tln],
        btl: colors[req.params.btl],
    };

    res.render('forecasts/danger-icon', styles, function(err, svg) {
        if (err) {
            res.send(500);
        } else {
            res.header('Cache-Control', 'no-cache');
            res.header('Content-Type', 'image/svg+xml');
            res.send(svg);
        }
    });
});

router.get('/:region/danger-rating-icon.svg', function(req, res) {
    var ratingStyles = {
        alp: '',
        tln: '',
        btl: '',
    };

    // TODO(wnh): Remove this giant hack
    if (req.region.id === 'north-rockies') {
        res.sendFile(
            config.root + '/server/views/forecasts/conditions-report-icon.svg'
        );
        return;
    }

    var renderIcon = function(styles) {
        res.render('forecasts/danger-icon', styles, function(err, svg) {
            if (err) {
                res.send(500);
            } else {
                res.header('Cache-Control', 'no-cache');
                res.header('Content-Type', 'image/svg+xml');
                res.send(svg);
            }
        });
    };

    ratingStyles = avalx.getDangerIconStyles(req.forecast.json);

    // Render Empty for Links
    if (req.region.properties.type === 'link') {
        renderIcon({
            alp: '',
            tln: '',
            btl: '',
        });
        return;
    }
    // Every other Region will be 'avalx' or 'parks'

    logger.debug(req.forecast.region, req.forecast.json.dangerMode);
    // Early season, Regular season, Spring situation, Off season
    if (req.forecast.json.dangerMode === 'Regular season') {
        //renderIcon(ratingStyles);
        var cacheKey = 'danger-rating-icon::' + req.region.id;
        fragmentCache
            .wrap(cacheKey, function() {
                logger.debug('BUILDING danger-rating-icon...', cacheKey);
                return Q.nfcall(
                    res.render.bind(res),
                    'forecasts/danger-icon',
                    ratingStyles
                );
            })
            .then(function(svg) {
                res.header('Cache-Control', 'no-cache');
                res.header('Content-Type', 'image/svg+xml');
                res.send(svg);
            })
            .catch(function(err) {
                logger.error('rendering danger rating:', err);
                res.status(500).send(err);
            });
    } else if (req.forecast.json.dangerMode === 'Off season') {
        res.header('cache-control', 'no-cache');
        res.header('content-type', 'image/svg+xml');
        fs
            .createReadStream(
                config.root + '/server/views/forecasts/no_rating_icon.svg'
            )
            .pipe(res);
    } else if (req.forecast.json.dangerMode === 'Early season') {
        res.header('cache-control', 'no-cache');
        res.header('content-type', 'image/svg+xml');
        fs
            .createReadStream(
                config.root + '/server/views/forecasts/early_season_icon.svg'
            )
            .pipe(res);
    } else if (req.forecast.json.dangerMode === 'Spring situation') {
        res.header('cache-control', 'no-cache');
        res.header('content-type', 'image/svg+xml');
        fs
            .createReadStream(
                config.root +
                    '/server/views/forecasts/spring_situation_icon_map.svg'
            )
            .pipe(res);
    } else {
        logger.error('unknown danger mode: ', req.forecast.json.dangerMode);
        res.send(500);
    }
});

function getDangerModes() {
    return fragmentCache.wrap('danger-modes', function() {
        logger.info('building danger-modes');
        /*
         * Use Q.Promise because the promise handleing in the Prismic library
         * wasnt working as expected
         */
        return Q.Promise(function(resolve, reject) {
            Prismic.api('https://avalancheca.prismic.io/api', function(
                err,
                api
            ) {
                if (err) {
                    reject(err);
                    return;
                }
                var dangerId = api.bookmarks['danger-modes'];

                api.getByID(dangerId, {}, function(err2, doc) {
                    if (err2) {
                        reject(err2);
                        return;
                    }
                    resolve(doc);
                });
            });
        }).then(function(doc) {
            var ids = _.map(regions.features, function(x) {
                return x.id;
            });
            var modes = {};
            var dangerModes = _.each(ids, function(id) {
                var value = doc.data['forecast-conditions.' + id];
                if (value) {
                    modes[id] = value.value;
                }
            });
            return modes;
        });
    });
}

module.exports = {
    router: router,
    getForecastData: getForecastData,
};
