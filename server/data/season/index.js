var path = require('path');
var config = require('../../config/environment');

var season = config.AC_SEASON;

if (!season.match(/^(2015|2016|2019|2022)$/)) {
    throw new Error('Season MUST be 2016, 2015, 2019 or 2022');
}

module.exports = {
    forecast_regions: require(path.join(__dirname, season, 'forecast-regions')),
};
