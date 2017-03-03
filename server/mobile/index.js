
var express = require('express');
var router = express.Router();
var feature_metadata = require('../api/features/metadata');
var _ = require('lodash');


var regions = _.map(feature_metadata['forecast-regions'], function(region, id){
    var r = {
        title: region.name,
        icon:  region.dangerIconUrl
    };
    if (region.type == 'link')
        r.link = region.url;
    if (region.type == 'parks')
        r.link = region.externalUrl;
    if (region.type == 'avalx')
        r.link = '/api/forecasts/' + id + '.html';
    return r;
});



router.get('/', function(req, res) {
    res.set('Content-Type', 'text/html').render('mobile/index', {regions: regions});
});

module.exports = router;

