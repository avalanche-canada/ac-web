
var regions  = require('./forecast-regions.json');
var hotzones = require('./hotzones.json');
var avalxMapping = require('./avalxMapping.json')

console.log('*** USING 2016 SEASON ***')

//TODO(wnh): Remove old URLS from the forecast json

regions.features.forEach((reg, idx) => {
    if(reg.properties.type !== 'avalx') {
        return;
    }
    var url = 'http://avalxdev.avalanche.ca/public/CAAML-eng.aspx?r=' + String(avalxMapping[reg.id]);
    regions.features[idx].properties.url = url;
})

var all =  {
  "type": "FeatureCollection",
  "features": regions.features.concat(hotzones.features)
};

module.exports = all;
