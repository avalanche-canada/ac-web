#!/usr/bin/env node
'use strict';
var fs = require('fs');
var _ = require('lodash');
var areas = JSON.parse(fs.readFileSync('./data/cac-polygons-regions-simple.geojson'));
var centroids = JSON.parse(fs.readFileSync('./data/cac-polygons-regions-centroids.geojson'));

_.each(areas.features, function (a) {
    console.log('merging %s', a.properties.display);
    var centroid =  _.find(centroids.features, function (c) { return c.properties.display === a.properties.display; });
    a.properties.centroid = centroid.geometry.coordinates;
});

fs.writeFile('./areas.geojson', JSON.stringify(areas), function () {
    console.log('merged complete!');
});