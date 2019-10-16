var assert = require('assert');

var datefns = require('date-fns');
var moment = require('moment-timezone');

var AVCAN_TO_INT = {
    "1:Low":                       1,
    "2:Moderate":                  2,
    "3:Considerable":              3,
    "4:High":                      4,
    "5:Extreme":                   5,
    "N/A:No Rating":               0,
    "N/A:'Spring'":                0,
    "N/A:Early Season Conditions": 0,
    "undefined:":                  0,
};
var START_DATE = '0001-01-01T00:00:00Z';
var   END_DATE = '9999-12-31T00:00:00Z';
/*
 * Transform a danger rating set (from the AvalX format into list of danger rating icons in from/to
 * date pairs in UTC time
 */
function genDangerIconSet(region_tz, dangerRatings) {
    assert(dangerRatings.length === 3, 'Need 3 danger ratings');

    var days = dangerRatings.map(function(rating){
        // Take only the date part as the time and TZ info is not actually
        // intended for use
        var only_date = rating.date.split("T")[0];
        var d = moment.tz(only_date, region_tz);
        return d.utc().toISOString();
    });

    return [
        {from: START_DATE, to: days[1], 
            dangerRating: ratingsToInts(dangerRatings[0].dangerRating)},
        {from: days[1], to: days[2], 
            dangerRating: ratingsToInts(dangerRatings[1].dangerRating)},
        {from: days[2], to: END_DATE, 
            dangerRating: ratingsToInts(dangerRatings[2].dangerRating)},
    ];
}

function ratingsToInts(rt){
    return {
        alp: AVCAN_TO_INT[rt.alp],
        tln: AVCAN_TO_INT[rt.tln],
        btl: AVCAN_TO_INT[rt.btl],
    };
}


module.exports.genDangerIconSet= genDangerIconSet;
