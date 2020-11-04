var fs = require('fs');
var path = require('path');

var metadata = require('./forecast-metadata.json');
var avalxMapping = require('./avalxMapping.json');
var logger = require('../../../logger');
var config = require('../../../config/environment');

logger.info('season: 2019');

//TODO(wnh): Remove old URLS from the forecast json

module.exports = {
    type: 'FeatureCollection',
    features: Object.keys(metadata).map(id => {
        var properties = metadata[id];
        var geometry = fs.readFileSync(path.join(__dirname, 'geometries', id + '.geojson'));
    
        // var url = null;
        // if (properties.type === 'avalx') {
        //     url =
        //         config.AVALX2016_ENDPOINT + '?r=' + String(avalxMapping[id]);
        // }

        // properties.url = url || properties.url;
        properties.id = id;

        return {
            id: id,
            type: 'Feature',
            geometry: JSON.parse(geometry),
            properties: properties
        }
    }).concat({
        id: 'yukon',
        type: 'Feature',
        properties: {
            name: 'Yukon',
            id: 'yukon',
            type: 'hotzone',
            _legacy: true,
            centroid: [-135.110971, 60.002517],
        },
        geometry: {
            type: 'Point',
            coordinates: [-135.110971, 60.002517],
        },
    }),
};

