'use strict';
var _ = require('lodash');
var request = require('request');
var semanticafy = require('semanticafy');
var Q = require('q');
var moment = require('moment-timezone');
var parseString = require('xml2js').parseString;

var ratings = {
    Low: '1',
    Moderate: '2',
    Considerable: '3',
    High: '4',
    Extreme: '5'
};

var colors = {
    green: '#52ba4a',
    yellow: '#fff300',
    orange: '#f79218',
    red: '#ef1c29',
    black: 'black',
    white: 'white'
};

var dangerRatingStyles = {
    iconFill: {
        '1:Low': colors.green,
        '2:Moderate': colors.yellow,
        '3:Considerable': colors.orange,
        '4:High': colors.red,
        '5:Extreme': colors.red,
        'N/A:No Rating': colors.white,
        'undefined:': colors.white
    },
    bannerFill: {
        '1:Low': colors.green,
        '2:Moderate': colors.yellow,
        '3:Considerable': colors.orange,
        '4:High': colors.red,
        '5:Extreme': colors.black,
        'N/A:No Rating': colors.white,
        'undefined:': colors.white
    },
    bannerStroke: {
        '1:Low': colors.black,
        '2:Moderate': colors.black,
        '3:Considerable': colors.black,
        '4:High': colors.black,
        '5:Extreme': colors.red,
        'N/A:No Rating': colors.black,
        'undefined:': colors.white
    },
    textFill: {
        '1:Low': colors.black,
        '2:Moderate': colors.black,
        '3:Considerable': colors.black,
        '4:High': colors.black,
        '5:Extreme': colors.white,
        'N/A:No Rating': colors.black,
        'undefined:': colors.black
    }
};


var parsePstDate = function(dateIn){
    var dateOut = '';
    if(!/(Z|PST|MST)$/g.test(dateIn)){
        dateOut = moment.tz(dateIn, "America/Los_Angeles").format();
    }
    else
    {
        dateOut = moment(dateIn);
    }
    return dateOut;
}

var parseUtcDate = function(dateIn){
    var dateOut = '';
    if(!/(Z|PST|MST)$/g.test(dateIn)){
        dateOut = moment.utc(dateIn);
    }
    else
    {
        dateOut = moment(dateIn);
    }
    return dateOut;
}

function getElevationIcon(elevations) {
    var zones = elevations.reduce(function (memo, elevation) {
        switch(elevation) {
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
    }, [0,0,0]);

    return 'http://www.avalanche.ca/assets/images/Elevation/Elevation-'+ zones[0] +'-'+ zones[1] +'-'+ zones[2] +'_EN.png';
}

function getCompassIcon(aspects) {
    var result = aspects.reduce(function (memo, aspect) {
        switch(aspect) {
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
    }, [0,0,0,0,0,0,0,0]);

    //http://www.avalanche.ca/Images/bulletin/Compass/compass-0-1-1-1-1-1-0-0_EN.png
    return 'http://www.avalanche.ca/assets/images/Compass/compass-'+ result[0]+'-'+ result[1] +'-'+ result[2] +'-'+ result[3] +'-'+ result[4] +'-'+ result[5] +'-'+ result[6] +'-'+ result[7]+'_EN.png';
}

function getLikelihoodIcon(likelihood) {
    var nLikelihood = '';
    if (/([A-Z])\w+/.test(likelihood)) {
        switch(likelihood) {
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

    return 'http://www.avalanche.ca/assets/images/Likelihood/Likelihood-'+ nLikelihood +'_EN.png';
}


function getSizeIcon(sizes) {
    //! image file names uses size without the decimal place (*10)
    //! thus size-0-10 represents a min of 0 and a max of 1
    //! or size-15-45 represents 1.5 to 4.5
    var min = sizes.min*10;
    var max = sizes.max*10;

    return 'http://www.avalanche.ca/assets/images/size/Size-'+ min +'-'+ max +'_EN.png';
}

function getProblems(caamlProblems) {
    var ns = _.has(caamlProblems, 'caaml:avProblem') ? 'caaml:' : '';
    // av ca feeds aren't valid caaml, hack to make it work
    var avProblemAccessor = ns ? 'avProblem' : 'AvProblem';

    function getComponents(xlink){
        return xlink['$']['xlink:href'].split('_')[1];
    }

    var problems = _.map(caamlProblems[ns+avProblemAccessor], function (caamlAvProblem) {
        return {
            type: caamlAvProblem[ns+'type'][0],
            elevations: _.map(caamlAvProblem[ns+'validElevation'], getComponents),
            aspects: _.map(caamlAvProblem[ns+'validAspect'], getComponents),
            likelihood: caamlAvProblem[ns+'likelihoodOfTriggering'][0][ns+'Values'][0][ns+'typical'][0],
            expectedSize: {min: caamlAvProblem[ns+'expectedAvSize'][0][ns+'Values'][0][ns+'min'][0],
                           max: caamlAvProblem[ns+'expectedAvSize'][0][ns+'Values'][0][ns+'max'][0]},
            comment: caamlAvProblem[ns+'comment'][0],
            travelAndTerrainAdvice: caamlAvProblem[ns+'travelAdvisoryComment'][0]
        };
    });

    _.each(problems, function (p) {
        p.icons = {
            elevations: getElevationIcon(p.elevations),
            aspects: getCompassIcon(p.aspects),
            likelihood: getLikelihoodIcon(p.likelihood),
            expectedSize: getSizeIcon(p.expectedSize)
        };
    });

    return problems;
}

//! Populate a parks forecast object given caaml data that follows the parks canada format
function parksForecast(caaml, region){
    var caamlBulletin = caaml['CaamlData']['observations'][0]['Bulletin'][0];
    var caamlProblems = caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avProblems'][0];

    function getDangerRatings(caamlDangerRatings){
        //! Day danger ratings are UTC
        var daysDangerRatings = _.groupBy(caamlDangerRatings, function (dr) {
            return moment.utc(dr['validTime'][0]['TimeInstant'][0]['timePosition'][0]);
        });

        function formatDangerRating(dangerRating) {
            return dangerRating['mainValue'][0]  + ":" +  dangerRating['customData'][0]['DangerRatingDisplay'][0]['mainLabel'][0];
        }

        function getRatingByZone(dangerRatings, zone){
            var rating = _.find(dangerRatings, function (ddr) {
                return ddr['validElevation'][0]['$']['xlink:href'] === 'ElevationLabel_' + zone;
            });
            return formatDangerRating(rating);
        }

        return _.map(daysDangerRatings, function (dayDangerRatings) {
            return {
                date: dayDangerRatings[0]['validTime'][0]['TimeInstant'][0]['timePosition'][0],
                dangerRating: {
                    alp: getRatingByZone(dayDangerRatings, 'Alp'),
                    tln: getRatingByZone(dayDangerRatings, 'Tln'),
                    btl: getRatingByZone(dayDangerRatings, 'Btl')
                }
            }
        });
    }

    var dates = {
        //! Date Issued and Valid Until are timezone sensitive (not UTC)
        dateIssued: parseUtcDate(caamlBulletin['validTime'][0]['TimePeriod'][0]['beginPosition'][0]),
        validUntil: parseUtcDate(caamlBulletin['validTime'][0]['TimePeriod'][0]['endPosition'][0])
    };

    // park dates aren't always consistant
    // they sometimes miss the Z (UTC) designator
    /*
    for(var d in dates) {
        var date = dates[d];
        if(!/Z$/g.test(date)) dates[d] = date + 'Z';
    }*/

    return {
        id: caamlBulletin['$']['gml:id'],
        region: region,
        dateIssued: dates.dateIssued,
        validUntil: dates.validUntil,
        bulletinTitle: caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['bulletinTitle'][0],
        highlights: caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['highlights'][0],
        confidence: (function (confidence) {
            return confidence['confidenceLevel'][0] + ' - ' + confidence['comment'][0];
        })(caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['bulletinConfidence'][0]['Components'][0]),
        dangerRatings: getDangerRatings(caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['dangerRatings'][0]['DangerRating']),
        problems: getProblems(caamlProblems),
        avalancheSummary: caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avActivityComment'][0],
        snowpackSummary: caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['snowpackStructureComment'][0],
        weatherForecast: caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['wxSynopsisComment'][0]
    };
};

function avalancheCaForecast(caaml, region){
    var caamlBulletin      = caaml['caaml:ObsCollection']['caaml:observations'][0]['caaml:Bulletin'][0];
    var caamlDangerRatings = caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:dangerRatings'][0]['caaml:DangerRating'];
    var caamlProblems      = caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:avProblems'][0];

    function formatDangerRating(dangerRating) {
        return ratings[dangerRating] ? ratings[dangerRating]  + ":" +  dangerRating : 'N/A:No Rating';
    }

    function getDangerRatings(caamlDangerRatings){
        return _.map(caamlDangerRatings, function (dangerRating) {
            return {
                //! Daily danger ratings are UTC
                "date": moment.utc(dangerRating['gml:validTime'][0]['gml:TimeInstant'][0]['gml:timePosition'][0]),
                "dangerRating": {
                    "alp": formatDangerRating(dangerRating['caaml:dangerRatingAlpValue'][0]),
                    "tln": formatDangerRating(dangerRating['caaml:dangerRatingTlnValue'][0]),
                    "btl": formatDangerRating(dangerRating['caaml:dangerRatingBtlValue'][0])
                }
            }
        });
    }


    _.each(caamlProblems['caaml:avProblem'], function (p, index) {
        var min = parseInt(caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:min'][0]);
        var max = parseInt(caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:max'][0]);
        caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:min'][0] = (min * 0.5) + 0.5;
        caamlProblems['caaml:avProblem'][index]['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:max'][0] = (max * 0.5) + 0.5;
    });

    //['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:min'][0] = ( caamlProblems['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:min'][0] * 0.5 ) + 0.5;
    //caamlProblems['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:max'][0] = ( caamlProblems['caaml:expectedAvSize'][0]['caaml:Values'][0]['caaml:max'][0] * 0.5 ) + 0.5;

    return {
        id: caamlBulletin['$']['gml:id'],
        region: region,
        //! Date Issued and Valid Until are timezone sensitive
        dateIssued: parsePstDate(caamlBulletin['gml:validTime'][0]['gml:TimePeriod'][0]['gml:beginPosition'][0]),
        validUntil: parsePstDate(caamlBulletin['gml:validTime'][0]['gml:TimePeriod'][0]['gml:endPosition'][0]),
        forecaster: caamlBulletin['caaml:obsMetaDataProperty'][0]['caaml:ObsMetaData'][0]['caaml:observedBy'][0]['caaml:PersonString'][0],
        bulletinTitle: caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:bulletinTitle'][0],
        highlights: caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:highlights'][0],
        confidence: (function (confidence) {
            return confidence['caaml:confidenceLevel'][0];
        })(caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:bulletinConfidence'][0]['caaml:Components'][0]),
        dangerRatings: getDangerRatings(caamlDangerRatings),
        problems: getProblems(caamlProblems),
        avalancheSummary: caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:avActivityComment'][0],
        snowpackSummary: caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:snowpackStructureComment'][0],
        weatherForecast: caamlBulletin['caaml:bulletinResultsOf'][0]['caaml:BulletinMeasurements'][0]['caaml:wxSynopsisComment'][0],
     };
}

function fetchCaamlForecast(region, callback) {
    if (region && region.properties && region.properties.url){
        request(region.properties.url, function (error, response, body) {
            if (!error && response.statusCode == 200 && body) {
                callback(null, body);
            } else {
                callback("empty response from avalx server");
            }
        });
    } else {
        callback("invalid avalx region");
    }
}

function cleanHtml(forecast){
    var rules = [
        {
            styleContains: 'bold',
            wrapWith: 'strong'
        },
        {
            styleContains: 'Italic',
            wrapWith: 'i'
        }
    ];

    function clean(html){
        var deferred = Q.defer();

        if(html.indexOf('<style') !== -1){
            semanticafy.parse(html, rules, function (err, cleaned) {
                if(err) {
                    deferred.reject(err);
                } else {
                    // parks bulleting start with !_! not too sure why...?
                    deferred.resolve(cleaned.replace('!_!', ''));
                }
            });
            return deferred.promise;
        } else {
            return html;
        }
    }


    var cleans = _.map(forecast, function (v, k) {
        if (_.isString(v)) {
            return Q.when(clean(v), function (cleaned) {
                forecast[k] = cleaned;
            });
        }
    });

    return Q.allSettled(cleans);
}

function parseForecast(caaml, region){
    if (region.properties.owner === "parks-canada") {
        return parksForecast(caaml, region.id);
    } else if (region.properties.owner === "avalanche-canada") {
        return  avalancheCaForecast(caaml, region.id);
    } else {
        throw new Error("Invalid region: " + caamlForecast.region);
    }
}

function cleanForecast(forecast){
    return cleanHtml(forecast).then(function () {
        return Q.allSettled(_.map(forecast.problems, function (problem) {
            return cleanHtml(problem);
        }));
    }).then(function () {
        return forecast;
    });
}

function parseCaamlForecast(caaml, region, callback) {
    parseString(caaml, function (err, caamlJson) {
        if (!err && caamlJson) {
            var forecast = parseForecast(caamlJson, region);

            cleanForecast(forecast)
                .then(function (cleaned) {
                    callback(null, cleaned);
                }).catch(function (e) {
                    callback(e);
                }).done();
        } else {
            callback("parsed data invalid");
        }
    });
}

function getDangerIconStyles(forecast) {
    var todaysRating = forecast.dangerRatings[0].dangerRating;

    return {
        alp: dangerRatingStyles.bannerFill[todaysRating.alp],
        tln: dangerRatingStyles.bannerFill[todaysRating.tln],
        btl: dangerRatingStyles.bannerFill[todaysRating.btl]
    };
}

//! this function is used to get the colors used by the forecast (danger rating) table
//! this function is used when there is not access to css and no nowcast (RSS and Print views)
//! [in] forecast
//! [out] danger rating colours for each elevation band for all three days (today, today+1, today+2)
function getForecastTableColors(forecast){
    return {
        day0: {
            alp: dangerRatingStyles.bannerFill[forecast.dangerRatings[0].dangerRating.alp],
            tln: dangerRatingStyles.bannerFill[forecast.dangerRatings[0].dangerRating.tln],
            btl: dangerRatingStyles.bannerFill[forecast.dangerRatings[0].dangerRating.btl]
        },
        day1: {
            alp: dangerRatingStyles.bannerFill[forecast.dangerRatings[1].dangerRating.alp],
            tln: dangerRatingStyles.bannerFill[forecast.dangerRatings[1].dangerRating.tln],
            btl: dangerRatingStyles.bannerFill[forecast.dangerRatings[1].dangerRating.btl]
        },
        day2: {
            alp: dangerRatingStyles.bannerFill[forecast.dangerRatings[2].dangerRating.alp],
            tln: dangerRatingStyles.bannerFill[forecast.dangerRatings[2].dangerRating.tln],
            btl: dangerRatingStyles.bannerFill[forecast.dangerRatings[2].dangerRating.btl]
        },
    }
}

function getNowcastStyles(forecast) {
    var todaysRating = forecast.dangerRatings[0].dangerRating;

    return  {
        alp: {
            rating: todaysRating.alp.replace(':', ' - '),
            iconFill: dangerRatingStyles.iconFill[todaysRating.alp],
            bannerFill: dangerRatingStyles.bannerFill[todaysRating.alp],
            bannerStroke: dangerRatingStyles.bannerStroke[todaysRating.alp],
            textFill: dangerRatingStyles.textFill[todaysRating.alp]
        },
        tln: {
            rating: todaysRating.tln.replace(':', ' - '),
            iconFill: dangerRatingStyles.iconFill[todaysRating.tln],
            bannerFill: dangerRatingStyles.bannerFill[todaysRating.tln],
            bannerStroke: dangerRatingStyles.bannerStroke[todaysRating.tln],
            textFill: dangerRatingStyles.textFill[todaysRating.tln]
        },
        btl: {
            rating: todaysRating.btl.replace(':', ' - '),
            iconFill: dangerRatingStyles.iconFill[todaysRating.btl],
            bannerFill: dangerRatingStyles.bannerFill[todaysRating.btl],
            bannerStroke: dangerRatingStyles.bannerStroke[todaysRating.btl],
            textFill: dangerRatingStyles.textFill[todaysRating.btl]
        }
    };
}

function getTableLocals(forecast){
    var ratingColors = getForecastTableColors(forecast);
    var dates = {
        issued : moment(forecast.dateIssued).format('ddd, DD MMM YYYY HH:mm'),
        until : moment(forecast.validUntil).format('ddd, DD MMM YYYY HH:mm'),
        day0 : moment.utc(forecast.dangerRatings[0].date ).format('ddd, DD MMM'),
        day1 : moment.utc(forecast.dangerRatings[1].date ).format('ddd, DD MMM'),
        day2 : moment.utc(forecast.dangerRatings[2].date ).format('ddd, DD MMM'),
    };

    return {
        guid: moment(forecast.dateIssued).unix(),
        dates: dates,
        ratingColors: ratingColors,
        forecast: forecast
    }
}

module.exports = {
    fetchCaamlForecast: fetchCaamlForecast,
    parseCaamlForecast: parseCaamlForecast,
    getDangerIconStyles: getDangerIconStyles,
    getNowcastStyles: getNowcastStyles,
    getForecastTableColors: getForecastTableColors,
    getTableLocals: getTableLocals
};
