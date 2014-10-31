var _ = require('lodash');
var express = require('express');
var router = express.Router();
var avalx = require('./avalx');
var regions = require('./forecast-regions');
var areas = require('./forecast-areas');

var forecastsCache = [];
router.param('region', function (req, res, next) {
    var regionId = req.params.region;
    var date = req.query.date;
    req.region = _.find(regions.features, {id: regionId});

    // todo: temp caching in order to not slow down development while the caaml server performs poorly
    req.forecast = _.find(forecastsCache, function (f) { return f.json.region === req.params.region; });
    if(!req.forecast && req.region.properties.type === 'avalx') {
        avalx.fetchCaamlForecast(req.region, date, function (caamlForecast) {
            if(caamlForecast){
                req.forecast = {
                    region: regionId,
                    date: date,
                    caaml: caamlForecast
                };

                avalx.parseCaamlForecast(req.forecast, req.region.properties.owner, function (jsonForecast) {
                    req.forecast.json = jsonForecast;
                    forecastsCache.push(req.forecast); // todo: temp caching
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
    } else if (!req.forecast) {
        req.forecast = {
            json: {
                id: regionId,
                name: req.region.properties.name,
                externalUrl: req.region.properties.url
            }
        };
        forecastsCache.push(req.forecast); // todo: temp caching
        next();
    } else {
        console.log('serving up a cached forecast');
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
        switch(req.params.format){
            case 'xml':
                res.header('Content-Type', 'application/xml');
                res.send(req.forecast.caaml);
                break;
            case 'json':
                res.json(req.forecast.json);
                break;
            case 'rss':
                res.render('forecasts/forecast-rss', {url: "url",forecast: req.forecast.json});
                break;
            case 'html':
                res.render('forecasts/forecast-html', {forecast: req.forecast.json});
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
