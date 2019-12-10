var assert = require('assert');
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
function genMovingDangerIconSet(region_tz, dangerRatings) {
    assert(dangerRatings.length === 3, 'Need 3 danger ratings');

    var days = dangerRatings.map(function(rating){
        const date = rating.date;

        // TODO Review the logic here. We rely on whatever the caller does on the data before. AvalX parses dates when the AvID one does not. 
        if (date instanceof Date) {
            date = date.toISOString()
        }
        
        // Take only the date part as the time and TZ info is not actually
        // intended for use
        var only_date = date.split("T")[0];
        var d = moment.tz(only_date, region_tz);
        return d.utc().toISOString();
    });

    return [
        { from: START_DATE,
          to: days[1],
          ratings: ratingsToInts(dangerRatings[0].dangerRating),
          iconType: 'RATINGS' },

        { from: days[1],
          to: days[2],
          ratings: ratingsToInts(dangerRatings[1].dangerRating),
          iconType: 'RATINGS' },

        { from: days[2],
          to: END_DATE,
          ratings: ratingsToInts(dangerRatings[2].dangerRating),
          iconType: 'RATINGS' },
    ];
}

function genSingleDangerIconSet(region_tz, dangerRatings) {
    return [
        { from: START_DATE,
          to: END_DATE,
          ratings: ratingsToInts(dangerRatings[0].dangerRating),
          iconType: 'RATINGS' },
    ];
}

function ratingsToInts(rt){
    return {
        alp: AVCAN_TO_INT[rt.alp],
        tln: AVCAN_TO_INT[rt.tln],
        btl: AVCAN_TO_INT[rt.btl],
    };
}

function staticSet(iconType) {
    return [{
        from: START_DATE,
        to: END_DATE,
        iconType: iconType,
    }];
}

function addStaticIcons(region_tz, forecast){
    return addIcon(genSingleDangerIconSet, region_tz, forecast);
}
function addMovingIcons(region_tz, forecast){
    return addIcon(genMovingDangerIconSet, region_tz, forecast);
}

function addIcon(type_fn, region_tz, forecast){
    var iconSet = {};
    if (forecast.dangerMode ===  "Regular season") {
        iconSet = type_fn(region_tz, forecast.dangerRatings);
    } else if (forecast.dangerMode ===  "Early season") {
        iconSet = staticSet('EARLY_SEASON');
    } else if (forecast.dangerMode ===  "Off season") {
        iconSet = staticSet('OFF_SEASON');
    } else if (forecast.dangerMode ===  "Spring situation") {
        iconSet = staticSet('SPRING');
    } else {
        assert(false, "Unknown forecast danger mode:" + forecast.dangerMode);
    }
    return Object.assign({}, forecast, {iconSet: iconSet});

}


module.exports.genMovingDangerIconSet = genMovingDangerIconSet;
module.exports.genSingleDangerIconSet = genSingleDangerIconSet;
module.exports.addStaticIcons = addStaticIcons;
module.exports.addMovingIcons = addMovingIcons;
