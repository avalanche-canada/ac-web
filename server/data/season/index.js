
var path = require('path');

var season  = process.env.AC_SEASON || '2015';

if(!season.match(/^(2015|2016)$/)) {
    throw new Exception('Season MUST be 2016 or 2015')
}

module.exports = {
    forecast_regions: require(path.join(__dirname,  season, 'forecast-regions'))
}
