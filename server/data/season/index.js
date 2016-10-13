
var season  = process.env.AC_SEASON || '2015';

if(!season.match(/^\d\d\d\d$/)) {
    throw new Exception('Season MUST be a valid year')
}

module.exports = {
    forecast_regions: require('./' + season + '/forecast-regions')
}
