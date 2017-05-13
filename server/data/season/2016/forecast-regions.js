var fs = require('fs');
var path = require('path');

var regionsMeta = require('./forecast-metadata.json');
var hotzones = require('./hotzones.json');
var avalxMapping = require('./avalxMapping.json');

console.log('*** USING 2016 SEASON ***');

var AVALX_HOST = process.env.AVALX_HOST || 'http://avalx2016.avalanche.ca';

//TODO(wnh): Remove old URLS from the forecast json

var features = Object.keys(regionsMeta).map(id => {
    var props = regionsMeta[id];

    var url = null;
    if (props.type === 'avalx') {
        url =
            AVALX_HOST + '/public/CAAML-eng.aspx?r=' + String(avalxMapping[id]);
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
