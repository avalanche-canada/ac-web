var _ = require('lodash');
var express = require('express');
var router = express.Router();
var request = require('request');
var caamlEndpoints = require('./forecast-caaml-endpoints.json');

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
        'N/A:No Rating': colors.white
    },
    bannerFill: {
        '1:Low': colors.green,
        '2:Moderate': colors.yellow,
        '3:Considerable': colors.orange,
        '4:High': colors.red,
        '5:Extreme': colors.black,
        'N/A:No Rating': colors.white
    },
    bannerStroke: {
        '1:Low': colors.black,
        '2:Moderate': colors.black,
        '3:Considerable': colors.black,
        '4:High': colors.black,
        '5:Extreme': colors.red,
        'N/A:No Rating': colors.black
    },
    textFill: {
        '1:Low': colors.black,
        '2:Moderate': colors.black,
        '3:Considerable': colors.black,
        '4:High': colors.black,
        '5:Extreme': colors.white,
        'N/A:No Rating': colors.black
    }
};


function getProblems(caamlProblems) {
    var ns = _.has(caamlProblems, 'caaml:avProblem') ? 'caaml:' : '';
    // av ca feeds aren't valid caaml, hack to make it work
    var avProblemAccessor = ns ? 'avProblem' : 'AvProblem';

    function getComponents(xlink){
        return xlink['$']['xlink:href'].split('_')[1];
    }

    return _.map(caamlProblems[ns+avProblemAccessor], function (caamlAvProblem) {
        return { 
            type: caamlAvProblem[ns+'type'][0],
            elevations: _.map(caamlAvProblem[ns+'validElevation'], getComponents),
            aspects: _.map(caamlAvProblem[ns+'validAspect'], getComponents),
            likelihood: caamlAvProblem[ns+'likelihoodOfTriggering'][0][ns+'Values'][0][ns+'typical'][0],
            expectedSize: caamlAvProblem[ns+'expectedAvSize'][0][ns+'Values'][0][ns+'typical'][0],
            comment: caamlAvProblem[ns+'comment'][0],
            travelAndTerrainAdvice: caamlAvProblem[ns+'travelAdvisoryComment'][0]
        };
    });
}

//! Populate a parks forecast object given caaml data that follows the parks canada format
function parksForecast(caaml, region){
    var caamlBulletin = caaml['CaamlData']['observations'][0]['Bulletin'][0];
    var caamlProblems = caamlBulletin['bulletinResultsOf'][0]['BulletinMeasurements'][0]['avProblems'][0];

    function getDangerRatings(caamlDangerRatings){
        var daysDangerRatings = _.groupBy(caamlDangerRatings, function (dr) {
            return dr['validTime'][0]['TimeInstant'][0]['timePosition'][0];
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
                    btl: getRatingByZone(dayDangerRatings, 'Tln'),
                    tln: getRatingByZone(dayDangerRatings, 'Btl')
                }
            }
        });
    }

    return {
        id: caamlBulletin['$']['gml:id'],
        region: region,
        dateIssued: caamlBulletin['validTime'][0]['TimePeriod'][0]['beginPosition'][0],
        validUntil: caamlBulletin['validTime'][0]['TimePeriod'][0]['endPosition'][0],
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
        return ratings[dangerRating]  + ":" +  dangerRating;
    }

    function getDangerRatings(caamlDangerRatings){
        return _.map(caamlDangerRatings, function (dangerRating) {
            return {
                "date": dangerRating['gml:validTime'][0]['gml:TimeInstant'][0]['gml:timePosition'][0],
                "dangerRating": {
                    "alp": formatDangerRating(dangerRating['caaml:dangerRatingAlpValue'][0]),
                    "tln": formatDangerRating(dangerRating['caaml:dangerRatingTlnValue'][0]),
                    "btl": formatDangerRating(dangerRating['caaml:dangerRatingBtlValue'][0])
                }
            }
        });
    }

    return {  
        id: caamlBulletin['$']['gml:id'],
        region: region,
        dateIssued: caamlBulletin['gml:validTime'][0]['gml:TimePeriod'][0]['gml:beginPosition'][0],
        validUntil: caamlBulletin['gml:validTime'][0]['gml:TimePeriod'][0]['gml:endPosition'][0],
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

var getEndpointUrl = function (region, date){
    var url = caamlEndpoints[region].url;

    if(!date){
        today = new Date;
        //date = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
        date = "2013-03-01"; //! for testing purposes use a day with actual data
    }

    if (caamlEndpoints[region].type === "parks") {
        url = [url, date].join('&d=');
    }
    else { //assume avalanche ca
        url = [url, date].join('/');
    }

    return url;
}

function fetchCaamlForecast(region, date, successCallback, errorCallback) {
    var endpointUrl;

    if (caamlEndpoints[region]){
        endpointUrl = getEndpointUrl(region, date);

        request(endpointUrl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                if (body) {
                    successCallback(body);
                } else {
                    errorCallback("parsed data invalid");
                }
            } else {
                // log something...
            }
        });
    } else errorCallback("region not found");
}

function parseCaamlForecast(caamlForecast, successCallback, errorCallback) {
    var parseString = require('xml2js').parseString;

    parseString(caamlForecast.caaml, function (err, caaml) {
        var forecast;

        if (caaml) {
            if (caamlEndpoints[caamlForecast.region].type === "parks") {
                forecast = parksForecast(caaml, caamlForecast.region);
                successCallback(forecast);
            } else if (caamlEndpoints[caamlForecast.region].type === "ac") {
                console.log(caamlForecast.region)
                forecast = avalancheCaForecast(caaml, caamlForecast.region);
                successCallback(forecast);
            } else {
                errorCallback("Invalid region: " + caamlForecast.region);
            }
        } else {
            errorCallback("parsed data invalid");
        }
    });

}

router.param('region', function (req, res, next) {
    var region = req.params.region;
    var date = req.query.date;

    fetchCaamlForecast(region, date, function (caamlForecast) {
        if(caamlForecast){
            req.forecast = {
                region: region,
                date: date,
                caaml: caamlForecast
            };
            parseCaamlForecast(req.forecast, function (jsonForecast) {
                req.forecast.json = jsonForecast;
                next()
            }, function () { res.send(500); });
        }
        else {
            res.send(500);
        }
    }, function () { res.send(500); });

});

router.get('/:region/title.json', function(req, res) {
    if(req.forecast){
        res.json(req.forecast.json.bulletinTitle);
    } else {
        res.send(500);
    }
});

router.get('/:region/danger-rating-icon.svg', function(req, res) {

    if(req.forecast.json){
        var todaysRating = req.forecast.json.dangerRatings[0].dangerRating;
        var ratings = {
            alp: dangerRatingStyles.bannerFill[todaysRating.alp],
            tln: dangerRatingStyles.bannerFill[todaysRating.tln],
            btl: dangerRatingStyles.bannerFill[todaysRating.btl]
        };

        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'image/svg+xml');

        res.render('danger-icon', ratings);
    } else {
        res.send(500);
    }

});

router.get('/:region.:format', function(req, res) {

    if (req.forecast) {
        switch(req.params.format){
            case 'xml':
            res.header('Content-Type', 'application/xml');
                res.send(req.forecast.caaml);
                break;
            case 'json':
                res.json(req.forecast.json);
                break;
            default:
                res.send(404);
                break;
        }
    }
});

router.get('/:region/nowcast.svg', function(req, res) {

    if(req.forecast.json){
        var todaysRating = req.forecast.json.dangerRatings[0].dangerRating;
        var ratings = {
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

        res.header('Cache-Control', 'no-cache');
        res.header('Content-Type', 'image/svg+xml');

        res.render('forecasts/nowcast', ratings);
    }
    else{
        res.send(500);
    }

});

module.exports = router;
