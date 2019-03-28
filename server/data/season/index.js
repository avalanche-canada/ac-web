var path = require('path');
var config = require('../../config/environment');

var season = config.AC_SEASON;

if (!season.match(/^(2015|2016)$/)) {
    throw new Exception('Season MUST be 2016 or 2015');
}

module.exports = {
    forecast_regions: require(path.join(__dirname, season, 'forecast-regions')),
};
