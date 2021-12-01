var draftToHtml =  require('draftjs-to-html');
var dateFns = require('date-fns');

const ASSETS = 'https://www.avalanche.ca/assets/images/';

const RATINGS = {
    'low':           '1:Low',
    'moderate':      '2:Moderate',
    'considerable':  '3:Considerable',
    'high':          '4:High',
    'extreme':       '5:Extreme',
    'norating':      'N/A:No Rating',
};

const AVALX_LIKELIHOOD_ICON = {
    'certain'            : '9',
    'certain_verylikely' : '8',
    'verylikely'         : '7',
    'verylikely_likely'  : '6',
    'likely'             : '5',
    'likely_possible'    : '4',
    'possible'           : '3',
    'possible_unlikely'  : '2',
    'unlikely'           : '1',
};

const AVALX_SIZE = {
    "1":    "1.0",
    "1.5":  "1.5",
    "2":    "2.0",
    "2.5":  "2.5",
    "3":    "3.0",
    "3.5":  "3.5",
    "4":    "4.0",
    "4.5":  "4.5",
    "5":    "5.0",
}


// avid value -> AvalX constant
const AVLAX_ELEV = {
    'alp': 'Alp',
    'tln': 'Tln',
    'btl': 'Btl',
}
// Utils
function transformForecast(region_id, region_name, item) {
    var forecast = item.data;

    return Object.assign({}, {
        fxType:     'avid',
        dangerMode: 'Regular season',
        id:         forecast.reportId,
        region:     region_id,
        forecaster: forecast.forecaster,
        dateIssued: forecast.dateIssued,
        validUntil: forecast.validUntil,
        bulletinTitle: "Avalanche Bulletin - " + region_name,

        highlights: draftToHtml(forecast.highlights).replace(/\n/g, ''),

        avalancheSummary: draftToHtml(forecast.avalancheSummary).replace(/\n/g, ''),
        snowpackSummary:  draftToHtml(forecast.snowpackSummary).replace(/\n/g, ''),
        weatherForecast:  draftToHtml(forecast.weatherForecast).replace(/\n/g, ''),

        problems:      forecast.problems.map(transformProblem),
        confidence:    transformConfidenceLegacy(forecast.confidence),

        dangerRatings: forecast.dangerRatings
            .map(transformDangerRating)
            .sort(function(a, b){ return new Date(a.date) - new Date(b.date)}),

        avidConfidence: transformConfidence(forecast.confidence),
        avidTerrainAndTravel: forecast.terrainAndTravelAdvice,
    })
}

function transformDangerRating(dangerRating) {
    return {
        date: dangerRating.date,
        dangerRating: _object_entries(dangerRating.dangerRating).reduce(
            function(ratings, pair) {
                var elevation = pair[0];
                var rating = pair[1];
                ratings[elevation] = RATINGS[rating.value]
                return ratings
            },
            {}
        ),
    }
}

function _object_entries(obj) {
    return Object.keys(obj).map(function(k){
        return [k, obj[k]];
    });
}
function transformConfidence(confidence) {
    return {
        rating: confidence.rating.display,
        statements: confidence.statements
    }
}
function transformConfidenceLegacy(confidence) {
    return [
        confidence.rating.display,
        ' - ',
        confidence.statements.join(' '),
    ].join('')
}

function transformProblem(prob) {
    var ret = {
        // TODO: Verify if this is only used for display
        type:  prob.type,
        expectedSize:  {
            min: AVALX_SIZE[prob.expectedSize.min],
            max: AVALX_SIZE[prob.expectedSize.max],
        },
        likelihood: prob.likelihood.display,
        aspects: prob.aspects.map(function(a){ return a.value.toUpperCase(); }),
        elevations: prob.elevations.map(function(e){ return AVLAX_ELEV[e.value]}),
        comment: draftToHtml(prob.comment).replace(/\n/g, ''),
        icons: {
            elevations:   elevationsIcon(prob.elevations),
            aspects:      aspectsIcon(prob.aspects),
            likelihood:   likelihoodIcon(prob.likelihood),
            expectedSize: expectedSizeIcon(prob.expectedSize),
        },
    };
    return ret;
}

function _boolTo01(b) {
    return  b ? "1" : "0";
}
function aspectsIcon(aspects) {
    // DO NOT REORDER
    var ASPECT_ORDER = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    var aspect_vals = aspects.map(function(a){return a.value; });
    return [
        ASSETS,
        'Compass/compass-',
        ASPECT_ORDER.map(function(a){ 
            return _boolTo01(aspect_vals.indexOf(a) > -1); 
        }).join('-'),
        '_EN.png',
    ].join('')
}
function elevationsIcon(elevations) {
    // DO NOT REORDER - the index matters
    const ELEV_ORDER = ['btl', 'tln', 'alp'];
    var elevation_vals =  elevations.map(function(e){return e.value});
    return [
        ASSETS,
        'Elevation/Elevation-',
        ELEV_ORDER.map(function(e){
            return _boolTo01(elevation_vals.indexOf(e) > -1)
        }).join('-'),
        '_EN.png',
    ].join('')
}
function likelihoodIcon(likelihood) {
    return [
        ASSETS,
        'Likelihood/Likelihood-',
        AVALX_LIKELIHOOD_ICON[likelihood.value],
        '_EN.png',
    ].join('')
}

function expectedSizeIcon(size) {
    return [
        ASSETS, 
        'size/Size-', 
        Number(size.min) * 10, 
        '-', 
        Number(size.max) * 10, 
        '_EN.png',
    ].join('')
}

function transformOffseason(region_id, region_name, forecast) {
    // from icon_set.js
    var END_DATE = '0001-12-31T00:00:00Z';
	var avid_to_avcan = {
		'fall':   'Early season',
        'spring': 'Spring situation',
        'summer': 'Off season',
    };
    var data = forecast.data;
    
    return Object.assign({}, OFFSEASON_FX_TEMPLATE, {
        fxType:     'avid',
        id:         data.id,
        region:     region_id,
        dangerMode: avid_to_avcan[data.season.value],
        forecaster: data.forecaster,
        dateIssued: data.dateIssued,
        validUntil: END_DATE,
        bulletinTitle: "Avalanche Bulletin - " + region_name,
        highlights: draftToHtml(data.headline).replace(/\n/g, ''),
        
        weatherForecast:  draftToHtml(data.weatherSummary).replace(/\n/g, ''),
        dangerRatings: [1,2,3].map(function(i){
            var d = new Date(data.dateIssued);
            d = dateFns.addDays(d, i);

            return Object.assign({}, OFFSEASON_DANGER_TEMPLATE, {
                date: d.toISOString()
            });
        }),
        
        // AvID Extras
        avidOffseasonComment: draftToHtml(data.comment).replace(/\n/g, ''),
        avidOffseasonMessage: '<p>' + data.offSeasonMessage + '</p>',
    });
}

/*
 * Take a list element that comes from the /v1/public/{lang}/products endpoint
 * and translates it into a valid ac-web JSON forecast.
 */
function transformAvidItem(region_id, region_name, item) {
    if(item.productType === 'offseason') {
        return transformOffseason(region_id, region_name, item);
    } else if(item.productType === 'forecast') {
        return transformForecast(region_id, region_name, item);
    } else {
        throw new Error("Unsupported AvID productType: " + item.type);
    }
}


function parseAvid(region_id, region_name) {
    return function(item) {
        return transformAvidItem(region_id, region_name, item);
    }
}


var OFFSEASON_FX_TEMPLATE = {
  "id": "",
  "region": "",
  "forecaster": "",
  "dateIssued": "",
  "validUntil": "",
  "bulletinTitle": "",
  "highlights": "",
  "confidence": " - ",
  "dangerRatings": [],
  "problems": [],
  "avalancheSummary": "",
  "snowpackSummary": "",
  "weatherForecast": "",
  "dangerMode": "Off season"
};
var OFFSEASON_DANGER_TEMPLATE = {
  "date": "2017-07-14T00:00:00",
  "dangerRating": {
	"alp": "N/A:No Rating",
	"tln": "N/A:No Rating",
	"btl": "N/A:No Rating"
  }
};

module.exports = {
    parseAvid                 : parseAvid,
    transformForecast         : transformForecast,
    transformDangerRating     : transformDangerRating,
    transformConfidence       : transformConfidence,
    transformConfidenceLegacy : transformConfidenceLegacy,
    transformProblem          : transformProblem,
    transformOffseason        : transformOffseason,
}
