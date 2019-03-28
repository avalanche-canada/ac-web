var fs = require('fs');
var path = require('path');

var regionsMeta = require('./forecast-metadata.json');
var hotzones = require('./hotzones.json');
var avalxMapping = require('./avalxMapping.json');
var logger = require('../../../logger');
var config = require('../../../config/environment');

logger.info('season: 2016');


//TODO(wnh): Remove old URLS from the forecast json

var features = Object.keys(regionsMeta).map(id => {
    var props = regionsMeta[id];

    var url = null;
    if (props.type === 'avalx') {
        url =
            config.AVALX2016_ENDPOINT + '?r=' + String(avalxMapping[id]);
    }
    props.url = url || props.url;

    var feature = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'regionGeo', id + '.geojson'))
    );

    return Object.assign({}, feature, { properties: props, id: id });
});

var hzFeaturesWithId = hotzones.features.map(h =>
    Object.assign({}, h, { id: h.properties.id })
);

var all = {
    type: 'FeatureCollection',
    features: features.concat(hzFeaturesWithId),
};

module.exports = all;
