#!/usr/bin/env node
'use strict';
var fs = require('fs');
var regions = require('../server/api/forecasts/regions');
var centroids = require('../server/api/forecasts/region-centroids');
var urls = require('../server/api/forecasts/forecast-caaml-endpoints');

regions.features = regions.features.map(function (r) {
    console.log('merging %s', r.properties.id);
    var centroid = centroids.features.filter(function (c) { return c.properties.id === r.properties.id; })[0];
    var url = urls[r.properties.id].url;

    r.properties.centroid = centroid.geometry.coordinates;
    r.properties.url = url;
    r.properties.forecastUrl = '/api/forecasts/' + r.properties.id + '.json';
    r.properties.dangerIconUrl = '/api/forecasts/' + r.properties.id + '/danger-rating-icon.svg';
    r.id = r.properties.id;
    delete r.properties.id;

    return {
        type: 'Feature',
        id: r.id,
        properties: r.properties,
        geometry: r.geometry
    }
});

fs.writeFile('./merged-datasets.json', JSON.stringify(regions), function () {
    console.log('merged complete!');
});



