 
var fs   = require('fs');
var path = require('path');

var regionsMeta  = require('./forecast-metadata.json');
var hotzones     = require('./hotzones.json');
var avalxMapping = require('./avalxMapping.json');

console.log('*** USING 2016 SEASON ***')

//TODO(wnh): Remove old URLS from the forecast json

var features = Object.keys(regionsMeta).map(id => {
    console.log(id);
    var props = regionsMeta[id];

    var url = null;
    if(props.type === 'avalx') {
        url = 'http://avalxdev.avalanche.ca/public/CAAML-eng.aspx?r=' + String(avalxMapping[id]);
    }
    props.url = url || props.url;

    var feature = JSON.parse(fs.readFileSync(path.join(__dirname, 'regionGeo', id + '.geojson')));

    return Object.assign({}, feature, {properties: props});
})

var all =  {
  "type": "FeatureCollection",
  "features": features.concat(hotzones.features)
};

module.exports = all;
