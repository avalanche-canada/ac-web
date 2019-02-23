'use strict';
var _ = require('lodash');
var request = require('request');
var Q = require('q');
var moment = require('moment-timezone');
var parseString = require('xml2js').parseString;
var logger = require('../../logger');

var AC_SEASON = process.env.AC_SEASON || '2015';

var ratings = {
    Low: '1',
    Moderate: '2',
    Considerable: '3',
    High: '4',
    Extreme: '5',
};

var colors = {
    green: '#52ba4a',
    yellow: '#fff300',
    orange: '#f79218',
    red: '#ef1c29',
    black: 'black',
    white: 'white',
};

var CAAML_MODES = {
    REGULAR_SEASON: 'Regular season',
    SPRING_SITUATION: 'Spring situation',
    OFF_SEASON: 'Off season',
    EARLY_SEASON: 'Early season',
};

var DANGER_LABELS = {
    '1'   : 'Low',
    '2'   : 'Moderate',
    '3'   : 'Considerable',
    '4'   : 'High',
    '5'   : 'Extreme',
    'N/A' : 'No Rating',
}

var dangerRatingStyles = {
    iconFill: {
        '1:Low': colors.green,
        '2:Moderate': colors.yellow,
        '3:Considerable': colors.orange,
        '4:High': colors.red,
        '5:Extreme': colors.red,
        'N/A:No Rating': colors.white,
        "N/A:'Spring'": colors.white,
        'N/A:Early Season Conditions': colors.white,
        'undefined:': colors.white,
    },
    bannerFill: {
        '1:Low': colors.green,
        '2:Moderate': colors.yellow,
        '3:Considerable': colors.orange,
        '4:High': colors.red,
        '5:Extreme': colors.black,
        'N/A:No Rating': colors.white,
        "N/A:'Spring'": colors.white,
        'N/A:Early Season Conditions': colors.white,
        'undefined:': colors.white,
    },
    bannerStroke: {
        '1:Low': colors.black,
        '2:Moderate': colors.black,
        '3:Considerable': colors.black,
        '4:High': colors.black,
        '5:Extreme': colors.red,
        'N/A:No Rating': colors.black,
        "N/A:'Spring'": colors.black,
        'N/A:Early Season Conditions': colors.white,
        'undefined:': colors.white,
    },
    textFill: {
        '1:Low': colors.black,
        '2:Moderate': colors.black,
        '3:Considerable': colors.black,
        '4:High': colors.black,
        '5:Extreme': colors.white,
        'N/A:No Rating': colors.black,
        "N/A:'Spring'": colors.black,
        'N/A:Early Season Conditions': colors.white,
        'undefined:': colors.black,
    },
};

var parsePstDate = function(dateIn) {
    var dateOut = '';
    if (!/(Z|PST|MST)$/g.test(dateIn)) {
        dateOut = moment.tz(dateIn, 'America/Los_Angeles').format();
    } else {
        dateOut = moment(dateIn).format();
    }
    return dateOut;
};

var parseUtcDate = function(dateIn) {
    var dateOut = '';
    if (!/(Z|PST|MST)$/g.test(dateIn)) {
        dateOut = moment.utc(dateIn).format();
    } else {
        dateOut = moment(dateIn).format();
    }
    return dateOut;
};

function StripAvalxStyle(txt) {
    return txt.replace(/^[\s\S]*?<\/style>/m, '');
}

function getElevationIcon(elevations) {
    var zones = elevations.reduce(
        function(memo, elevation) {
            switch (elevation) {
                case 'Btl':
                    memo[0] = 1;
                    break;
                case 'Tln':
                    memo[1] = 1;
                    break;
                case 'Alp':
                    memo[2] = 1;
                    break;
                default:
                    break;
            }

            return memo;
        },
        [0, 0, 0]
    );

    return (
        'https://www.avalanche.ca/assets/images/Elevation/Elevation-' +
        zones[0] +
        '-' +
        zones[1] +
        '-' +
        zones[2] +
        '_EN.png'
    );
}

function getCompassIcon(aspects) {
    var result = aspects.reduce(
        function(memo, aspect) {
            switch (aspect) {
                case 'N':
                    memo[0] = 1;
                    break;
                case 'NE':
                    memo[1] = 1;
                    break;
                case 'E':
                    memo[2] = 1;
                    break;
                case 'SE':
                    memo[3] = 1;
                    break;
                case 'S':
                    memo[4] = 1;
                    break;
                case 'SW':
                    memo[5] = 1;
                    break;
                case 'W':
                    memo[6] = 1;
                    break;
                case 'NW':
                    memo[7] = 1;
                    break;
                default:
                    break;
            }

            return memo;
        },
        [0, 0, 0, 0, 0, 0, 0, 0]
    );

    //http://www.avalanche.ca/Images/bulletin/Compass/compass-0-1-1-1-1-1-0-0_EN.png
    return (
        'https://www.avalanche.ca/assets/images/Compass/compass-' +
        result[0] +
        '-' +
        result[1] +
        '-' +
        result[2] +
        '-' +
        result[3] +
        '-' +
        result[4] +
        '-' +
        result[5] +
        '-' +
        result[6] +
        '-' +
        result[7] +
        '_EN.png'
    );
}

function getLikelihoodIcon(likelihood) {
    var nLikelihood = '';
    if (/([A-Z])\w+/.test(likelihood)) {
        switch (likelihood) {
            case 'Unlikely':
                nLikelihood = 1;
                break;
            case 'Possible - Unlikely':
                nLikelihood = 2;
                break;
            case 'Possible':
                nLikelihood = 3;
                break;
            case 'Likely - Possible':
                nLikelihood = 4;
                break;
            case 'Likely':
                nLikelihood = 5;
                break;
            case 'Very Likely - Likely':
                nLikelihood = 6;
                break;
            case 'Very Likely':
                nLikelihood = 7;
                break;
            case 'Certain - Very Likely':
                nLikelihood = 8;
                break;
            case 'Certain':
                nLikelihood = 9;
                break;
            default:
                break;
        }
    } else {
        nLikelihood = Number(likelihood);
    }

    return (
        'https://www.avalanche.ca/assets/images/Likelihood/Likelihood-' +
        nLikelihood +
        '_EN.png'
    );
}

function getSizeIcon(sizes) {
    //! image file names uses size without the decimal place (*10)
    //! thus size-0-10 represents a min of 0 and a max of 1
    //! or size-15-45 represents 1.5 to 4.5
    var min = sizes.min * 10;
    var max = sizes.max * 10;

    return (
        'https://www.avalanche.ca/assets/images/size/Size-' +
        min +
        '-' +
        max +
        '_EN.png'
    );
}

function getProblems(caamlProblems) {
    var ns = _.has(caamlProblems, 'caaml:avProblem') ? 'caaml:' : '';
    // av ca feeds aren't valid caaml, hack to make it work
    var avProblemAccessor = ns ? 'avProblem' : 'AvProblem';

    function getComponents(xlink) {
        return xlink['$']['xlink:href'].split('_')[1];
    }

    var problems = _.map(caamlProblems[ns + avProblemAccessor], function(
        caamlAvProblem
    ) {
        return {
            type: caamlAvProblem[ns + 'type'][0],
            elevations: _.map(
                caamlAvProblem[ns + 'validElevation'],
                getComponents
            ),
            aspects: _.map(caamlAvProblem[ns + 'validAspect'], getComponents),
            likelihood:
                caamlAvProblem[ns + 'likelihoodOfTriggering'][0][
                    ns + 'Values'
                ][0][ns + 'typical'][0],
            expectedSize: {
                min:
                    caamlAvProblem[ns + 'expectedAvSize'][0][ns + 'Values'][0][
                        ns + 'min'
                    ][0],
                max:
                    caamlAvProblem[ns + 'expectedAvSize'][0][ns + 'Values'][0][
                        ns + 'max'
                    ][0],
            },
            comment: StripAvalxStyle(caamlAvProblem[ns + 'comment'][0]),
            travelAndTerrainAdvice:
                caamlAvProblem[ns + 'travelAdvisoryComment'][0],
        };
    });

    _.each(problems, function(p) {
        p.icons = {
            elevations: getElevationIcon(p.elevations),
            aspects: getCompassIcon(p.aspects),
            likelihood: getLikelihoodIcon(p.likelihood),
            expectedSize: getSizeIcon(p.expectedSize),
        };
    });

    return problems;
}

//! Populate a parks forecast object given caaml data that follows the parks canada format
function parksForecast(caaml, region) {
    var caamlBulletin = caaml['CaamlData']['observations'][0]['Bulletin'][0];
    var caamlProblems =
        caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
            'avProblems'
        ][0];

    function getDangerRatings(caamlDangerRatings) {
        //! Day danger ratings are UTC
        var daysDangerRatings = _.groupBy(caamlDangerRatings, function(dr) {
            return moment
                .utc(dr['validTime'][0]['TimeInstant'][0]['timePosition'][0])
                .format();
        });

        function formatDangerRating(dangerRating) {
            var value = dangerRating['mainValue'][0];
            var txt = DANGER_LABELS[value.toUpperCase()]
            if(txt === undefined)  {
                txt = 'No Rating';
            }
            return value + ':' + txt;
        }

        function getRatingByZone(dangerRatings, zone) {
            var rating = _.find(dangerRatings, function(ddr) {
                return (
                    ddr['validElevation'][0]['$']['xlink:href'] ===
                    'ElevationLabel_' + zone
                );
            });
            return formatDangerRating(rating);
        }

        return _.map(daysDangerRatings, function(dayDangerRatings) {
            return {
                date:
                    dayDangerRatings[0]['validTime'][0]['TimeInstant'][0][
                        'timePosition'
                    ][0],
                dangerRating: {
                    alp: getRatingByZone(dayDangerRatings, 'Alp'),
                    tln: getRatingByZone(dayDangerRatings, 'Tln'),
                    btl: getRatingByZone(dayDangerRatings, 'Btl'),
                },
            };
        });
    }

    var dates = {
        //! Date Issued and Valid Until are timezone sensitive (not UTC)
        dateIssued: parseUtcDate(
            caamlBulletin['validTime'][0]['TimePeriod'][0]['beginPosition'][0]
        ),
        validUntil: parseUtcDate(
            caamlBulletin['validTime'][0]['TimePeriod'][0]['endPosition'][0]
        ),
    };

    // park dates aren't always consistant
    // they sometimes miss the Z (UTC) designator
    /*
    for(var d in dates) {
        var date = dates[d];
        if(!/Z$/g.test(date)) dates[d] = date + 'Z';
    }*/

    // Strip the '!_!' marker that parks uses to split the field
    //TODO(wnh): Figure out what the first part is and maybe there is a better way to do it.
    //           if not we can remove it in the Avalx-Public app so this can disapear
    var highlights =
        caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
            'highlights'
        ][0];
    if (highlights.search('!_!') > -1) {
        highlights = highlights
            .split('!_!')
            .slice(1)
            .join('!_!');
    }

    var forecaster =
        caaml.CaamlData.metaDataProperty[0].MetaData[0].srcRef[0].Operation[0]
            .contactPerson[0].Person[0].name[0];
    return {
        id: caamlBulletin['$']['gml:id'],
        region: region,
        forecaster: forecaster,
        dateIssued: dates.dateIssued,
        validUntil: dates.validUntil,
        bulletinTitle:
            caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
                'bulletinTitle'
            ][0],
        highlights: StripAvalxStyle(highlights),
        confidence: (function(confidence) {
            return (
                confidence['confidenceLevel'][0] +
                ' - ' +
                confidence['comment'][0]
            );
        })(
            caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
                'bulletinConfidence'
            ][0]['Components'][0]
        ),
        dangerRatings: getDangerRatings(
            caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
                'dangerRatings'
            ][0]['DangerRating']
        ),
        problems: getProblems(caamlProblems),
        avalancheSummary: StripAvalxStyle(
            caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
                'avActivityComment'
            ][0]
        ),
        snowpackSummary: StripAvalxStyle(
            caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
                'snowpackStructureComment'
            ][0]
        ),
        weatherForecast: StripAvalxStyle(
            caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
                'wxSynopsisComment'
            ][0]
        ),
        dangerMode:
            caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0][
                'dangerMode'
            ][0], //! Early season, Regular season, Spring situation, Off season
    };
}

function avalancheCaForecast(caaml, region, dangerMode) {
    var caamlBulletin =
        caaml['caaml:ObsCollection']['caaml:observations'][0][
            'caaml:Bulletin'
        ][0];
    var caamlDangerRatings =
        caamlBulletin['caaml:bulletinResultsOf'][0][
            'caaml:BulletinMeasurements'
        ][0]['caaml:dangerRatings'][0]['caaml:DangerRating'];
    var caamlProblems =
        caamlBulletin['caaml:bulletinResultsOf'][0][
            'caaml:BulletinMeasurements'
        ][0]['caaml:avProblems'][0];

    function formatDangerRating(dangerRating) {
        var out = ratings[dangerRating]
            ? ratings[dangerRating] + ':' + dangerRating
            : 'N/A:No Rating';
        if (out === "N/A:'Spring'") {
            out = 'N/A:No Rating';
        }
        return out;
    }

    function getDangerRatings(caamlDangerRatings) {
        return _.map(caamlDangerRatings, function(dangerRating) {
            return {
                //! Daily danger ratings are UTC
                date: moment.utc(
                    dangerRating['gml:validTime'][0]['gml:TimeInstant'][0][
                        'gml:timePosition'
                    ][0]
                ),
                dangerRating: {
                    alp: formatDangerRating(
                        dangerRating['caaml:dangerRatingAlpValue'][0]
                    ),
                    tln: formatDangerRating(
                        dangerRating['caaml:dangerRatingTlnValue'][0]
                    ),
                    btl: formatDangerRating(
                        dangerRating['caaml:dangerRatingBtlValue'][0]
                    ),
                },
            };
        });
    }

    _.each(caamlProblems['caaml:avProblem'], function(p, index) {
        var min = parseInt(
            caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0][
                'caaml:Values'
            ][0]['caaml:min'][0]
        );
        var max = parseInt(
            caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0][
                'caaml:Values'
            ][0]['caaml:max'][0]
        );
        caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0][
            'caaml:Values'
        ][0]['caaml:min'][0] =
            min * 0.5 + 0.5;
        caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0][
            'caaml:Values'
        ][0]['caaml:max'][0] =
            max * 0.5 + 0.5;
    });

    //['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:min'][0] = ( caamlProblems['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:min'][0] * 0.5 ) + 0.5;
    //caamlProblems['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:max'][0] = ( caamlProblems['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:max'][0] * 0.5 ) + 0.5;

    var publicDangerMode = CAAML_MODES.REGULAR_SEASON;
    if (typeof dangerMode !== undefined) {
        switch (dangerMode) {
            case 'SPRING':
                publicDangerMode = CAAML_MODES.SPRING_SITUATION;
                break;
            case 'SUMMER':
                publicDangerMode = CAAML_MODES.OFF_SEASON;
                break;
            case 'EARLY_SEASON':
                publicDangerMode = CAAML_MODES.EARLY_SEASON;
                break;
            case 'REGULAR':
                publicDangerMode = CAAML_MODES.REGULAR_SEASON;
                break;
        }
    }

    return {
        id: caamlBulletin['$']['gml:id'],
        region: region,
        //! Date Issued and Valid Until are timezone sensitive
        dateIssued: parsePstDate(
            caamlBulletin['gml:validTime'][0]['gml:TimePeriod'][0][
                'gml:beginPosition'
            ][0]
        ),
        validUntil: parsePstDate(
            caamlBulletin['gml:validTime'][0]['gml:TimePeriod'][0][
                'gml:endPosition'
            ][0]
        ),
        forecaster:
            caamlBulletin['caaml:obsMetaDataProperty'][0][
                'caaml:ObsMetaData'
            ][0]['caaml:observedBy'][0]['caaml:PersonString'][0],
        bulletinTitle:
            caamlBulletin['caaml:bulletinResultsOf'][0][
                'caaml:BulletinMeasurements'
            ][0]['caaml:bulletinTitle'][0],
        highlights: StripAvalxStyle(
            caamlBulletin['caaml:bulletinResultsOf'][0][
                'caaml:BulletinMeasurements'
            ][0]['caaml:highlights'][0]
        ),
        confidence: (function(confidence) {
            return confidence['caaml:confidenceLevel'][0];
        })(
            caamlBulletin['caaml:bulletinResultsOf'][0][
                'caaml:BulletinMeasurements'
            ][0]['caaml:bulletinConfidence'][0]['caaml:Components'][0]
        ),
        dangerRatings: getDangerRatings(caamlDangerRatings),
        problems: getProblems(caamlProblems),
        avalancheSummary: StripAvalxStyle(
            caamlBulletin['caaml:bulletinResultsOf'][0][
                'caaml:BulletinMeasurements'
            ][0]['caaml:avActivityComment'][0]
        ),
        snowpackSummary: StripAvalxStyle(
            caamlBulletin['caaml:bulletinResultsOf'][0][
                'caaml:BulletinMeasurements'
            ][0]['caaml:snowpackStructureComment'][0]
        ),
        weatherForecast: StripAvalxStyle(
            caamlBulletin['caaml:bulletinResultsOf'][0][
                'caaml:BulletinMeasurements'
            ][0]['caaml:wxSynopsisComment'][0]
        ),
        dangerMode: publicDangerMode, //'Regular season' //! \todo Early season, Regular season, Spring situation, Off season
    };
}

function fetchCaamlForecast(region, callback) {
    if (region && region.properties && region.properties.url) {
        request(region.properties.url, function(error, response, body) {
            if (!error && response.statusCode == 200 && body) {
                callback(null, body);
            } else {
                callback('empty response from avalx server');
            }
        });
    } else {
        callback(
            'fetchCaamlForecast: invalid avalx region: ' +
                JSON.stringify(region)
        );
    }
}

function parseForecast(caaml, region, dangerModes) {
    if (region.properties.owner === 'parks-canada') {
        return parksForecast(caaml, region.id);
    } else if (region.properties.owner === 'avalanche-canada') {
        //TODO(wnh): REMOVE ME WHEN WERE ROLLIGN IN 2016 (maybe 2017)
        if (AC_SEASON === '2016') {
            return parksForecast(caaml, region.id);
        } else {
            return avalancheCaForecast(caaml, region.id);
        }
    } else {
        throw new Error('Invalid region: ' + caamlForecast.region);
    }
}

function parseCaamlForecast(caaml, region, callback) {
    parseString(caaml, function(err, caamlJson) {
        if (!err && caamlJson) {
            var forecast = parseForecast(caamlJson, region);
            callback(null, forecast);
        } else {
            logger.error('parseCaamlForecast:', err);
            callback('parsed data invalid');
        }
    });
}

/*
 * getDangerIconStyles(forecast)
 *
 *    This function now just returns the 'first' danger rating in the list. This
 *    is to match the *large* danger rating on full forecast and thus avoid
 *    confusion, even if the days aren't quite right.
 */
function getDangerIconStyles(forecast) {
    if (forecast.region === 'waterton') {
        return getDangerIconStylesByDate(forecast);
    } else {
        return getDangerIconStylesFixed(forecast);
    }
}

function getDangerIconStylesByDate(forecast) {
    //! find todays danger rating
    var todaysRating = _.find(forecast.dangerRatings, function(dr) {
        //! if the forecast is today or tomorrows
        if (
            moment(dr.date).isSame(moment(), 'day') ||
            moment(dr.date).isSame(moment().add(1, 'day'), 'day')
        ) {
            return true;
        }
        return false;
    });

    //! if there is a danger rating for today found then display the danger rating
    if (todaysRating) {
        todaysRating = todaysRating.dangerRating;
    } else {
        //! no danger rating for today instead display no rating

        todaysRating = {
            alp: 'N/A:No Rating',
            tln: 'N/A:No Rating',
            btl: 'N/A:No Rating',
        };
    }
    //! return the danger rating style for the given danger rating
    return {
        alp: dangerRatingStyles.bannerFill[todaysRating.alp],
        tln: dangerRatingStyles.bannerFill[todaysRating.tln],
        btl: dangerRatingStyles.bannerFill[todaysRating.btl],
    };
}

function getDangerIconStylesFixed(forecast) {
    // Non avalx based forecasts still call this function so we're being
    // defensive
    var todaysRating = {
        alp: 'N/A:No Rating',
        tln: 'N/A:No Rating',
        btl: 'N/A:No Rating',
    };
    if (typeof forecast.dangerRatings !== 'undefined') {
        var todaysRating = forecast.dangerRatings[0].dangerRating;
    }

    return {
        alp: dangerRatingStyles.bannerFill[todaysRating.alp],
        tln: dangerRatingStyles.bannerFill[todaysRating.tln],
        btl: dangerRatingStyles.bannerFill[todaysRating.btl],
    };
}

//! this function is used to get the colors used by the forecast (danger rating) table
//! this function is used when there is not access to css and no nowcast (RSS and Print views)
//! [in] forecast
//! [out] danger rating colours for each elevation band for all three days (today, today+1, today+2)
function getForecastTableColors(forecast) {
    return {
        day0: {
            alp:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[0].dangerRating.alp
                ],
            tln:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[0].dangerRating.tln
                ],
            btl:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[0].dangerRating.btl
                ],
        },
        day1: {
            alp:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[1].dangerRating.alp
                ],
            tln:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[1].dangerRating.tln
                ],
            btl:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[1].dangerRating.btl
                ],
        },
        day2: {
            alp:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[2].dangerRating.alp
                ],
            tln:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[2].dangerRating.tln
                ],
            btl:
                dangerRatingStyles.bannerFill[
                    forecast.dangerRatings[2].dangerRating.btl
                ],
        },
    };
}

function getNowcastStyles(forecast) {
    var todaysRating = forecast.dangerRatings[0].dangerRating;

    return {
        alp: {
            rating: todaysRating.alp.replace(':', ' - '),
            iconFill: dangerRatingStyles.iconFill[todaysRating.alp],
            bannerFill: dangerRatingStyles.bannerFill[todaysRating.alp],
            bannerStroke: dangerRatingStyles.bannerStroke[todaysRating.alp],
            textFill: dangerRatingStyles.textFill[todaysRating.alp],
        },
        tln: {
            rating: todaysRating.tln.replace(':', ' - '),
            iconFill: dangerRatingStyles.iconFill[todaysRating.tln],
            bannerFill: dangerRatingStyles.bannerFill[todaysRating.tln],
            bannerStroke: dangerRatingStyles.bannerStroke[todaysRating.tln],
            textFill: dangerRatingStyles.textFill[todaysRating.tln],
        },
        btl: {
            rating: todaysRating.btl.replace(':', ' - '),
            iconFill: dangerRatingStyles.iconFill[todaysRating.btl],
            bannerFill: dangerRatingStyles.bannerFill[todaysRating.btl],
            bannerStroke: dangerRatingStyles.bannerStroke[todaysRating.btl],
            textFill: dangerRatingStyles.textFill[todaysRating.btl],
        },
    };
}

function getTableLocals(forecast) {
    var ratingColors = getForecastTableColors(forecast);
    var dates = {
        issued: moment(forecast.dateIssued).format('ddd, DD MMM YYYY HH:mm'),
        until: moment(forecast.validUntil).format('ddd, DD MMM YYYY HH:mm'),
        day0: moment.utc(forecast.dangerRatings[0].date).format('ddd, DD MMM'),
        day1: moment.utc(forecast.dangerRatings[1].date).format('ddd, DD MMM'),
        day2: moment.utc(forecast.dangerRatings[2].date).format('ddd, DD MMM'),
    };

    return {
        guid: moment(forecast.dateIssued).unix(),
        dates: dates,
        ratingColors: ratingColors,
        forecast: forecast,
    };
}

module.exports = {
    fetchCaamlForecast: fetchCaamlForecast,
    parseCaamlForecast: parseCaamlForecast,
    getDangerIconStyles: getDangerIconStyles,
    getNowcastStyles: getNowcastStyles,
    getForecastTableColors: getForecastTableColors,
    getTableLocals: getTableLocals,
    parksForecast: parksForecast,
    dangerColors: colors,
};
