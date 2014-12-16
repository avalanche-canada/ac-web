var _ = require('lodash');
var express = require('express');
var router = express.Router();
var avalx = require('./avalx');
var regions = require('./forecast-regions');
var WebCache = require('webcache');
var WebCacheRedis = require('webcache-redis');
var moment = require('moment');

var acAvalxUrls = _.chain(regions.features).filter(function (feature) {
    return feature.properties.owner === 'avalanche-canada' && feature.properties.type === 'avalx';
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

router.param('region', function (req, res, next) {
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
});

router.get('/', function(req, res) {
    // todo: need to delete original url prop, could clone then serve.
    // regions.features.forEach(function (r) { delete r.properties.url; });
    res.json(regions);
});

router.get('/areas', function(req, res) {
    res.json(areas);
});

router.get('/:region/title.json', function(req, res) {
    if(req.forecast.json){
        res.json(req.forecast.json.bulletinTitle);
    } else {
        res.send(500);
    }
});

router.get('/:region/danger-rating-icon.svg', function(req, res) {
    var ratingStyles = {
        alp: '',
        tln: '',
        btl: ''
    };

    if(req.region.properties.type === 'avalx'){
        ratingStyles = avalx.getDangerIconStyles(req.forecast.json);
    }

    res.header('Cache-Control', 'no-cache');
    res.header('Content-Type', 'image/svg+xml');
    res.render('forecasts/danger-icon', ratingStyles);
});

router.get('/:region.:format', function(req, res) {
    req.params.format = req.params.format || 'json'

    if (req.forecast) {

        var ratingColors = avalx.getForecastTableColors(req.forecast.json);
        var dates = {
            'issued' : moment(req.forecast.json.dateIssued).format('ddd, DD MMM YYYY HH:mm'),
            'until'  : moment(req.forecast.json.validUntil).format('ddd, DD MMM YYYY HH:mm'),
            'day0'   : moment.utc(req.forecast.json.dangerRatings[0].date ).format('ddd, DD MMM'),
            'day1'   : moment.utc(req.forecast.json.dangerRatings[1].date ).format('ddd, DD MMM'),
            'day2'   : moment.utc(req.forecast.json.dangerRatings[2].date ).format('ddd, DD MMM')
        };

        switch(req.params.format){
            case 'xml':
                res.header('Content-Type', 'application/xml');
                res.send(req.forecast.caaml);
                break;
            case 'json':
                res.json(req.forecast.json);
                break;
            case 'rss':
                res.render('forecasts/forecast-rss', {'dates': dates, 'ratingColors': ratingColors, 'forecast': req.forecast.json});
                break;
            case 'html':
                res.render('forecasts/forecast-html', {'dates': dates, 'ratingColors': ratingColors, 'forecast': req.forecast.json});
                break;
        }
    }
});

router.get('/:region/nowcast.svg', function(req, res) {
    var ratingStyles;

    if(req.forecast.json){
        ratingStyles = avalx.getNowcastStyles(req.forecast.json);
        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'image/svg+xml');
        res.render('forecasts/nowcast', ratingStyles);
    }
    else{
        res.send(500);
    }
});

module.exports = router;
