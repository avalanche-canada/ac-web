
var regions  = require('./forecast-regions.json');
var hotzones = require('./hotzones.json');

var all =  {
  "type": "FeatureCollection",
  "features": regions.features.concat(hotzones.features)
};

module.exports = all;
