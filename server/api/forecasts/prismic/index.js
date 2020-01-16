var logger = require('../../../logger');
var PrismicDOM = require('prismic-dom');
var fetch = require('../fetch');

module.exports = {
    fetch: function(region) {
        if (!IDS_TO_NAMES.hasOwnProperty(region)) {
            logger.debug('prismic avalanche forecast %s not available.', region);
    
            return;
        }
    
        var name = IDS_TO_NAMES[region];
        logger.debug('fetching prismic avalanche forecast %s', name);
        
        return fetch.doFetch(API).then(function(payload) {
            payload = JSON.parse(payload);
            
            var ref = payload.refs.find(function(ref) {
                return ref.isMasterRef;
            }).ref;
            var url = [
                API,
                '/documents/search?ref=',
                ref,
                '&q=[[at(my.avalanche-forecast.region,"',
                name,
                '")]]',
                '&q=[[date.before(my.avalanche-forecast.validFrom,"',
                getCurrentDateTime(),
                '")]]',
                '&orderings=[my.avalanche-forecast.validFrom desc, document.last_publication_date desc]',
            ].join('');

            logger.debug('fetching prismic avalanche forecast at %s', url);
    
            return fetch.doFetch(url).then(function(payload) {
                payload = JSON.parse(payload);
                
                return payload.results[0];
            });
        })
    },
    parse: function(document) {
        var data = document.data;
        var confidence = data.confidence[0];

        return {
            id: document.id,
            region: forecastRegionFromName(data.region),
            fxType: 'prismic',
            forecaster: data.forecaster,
            dateIssued: data.validFrom,
            validUntil: data.validTo,
            bulletinTitle: 'Avalanche Bulletin - ' + data.region,
            highlights: PrismicDOM.RichText.asHtml(data.headline),
            confidence:
                confidence.level +
                ' - ' +
                PrismicDOM.RichText.asText(confidence.statements),
            avidConfidence: {
                rating: confidence.level,
                statements: confidence.statements.map(pluckText),
            },
            avidTerrainAndTravel: data.terrainAndTravelAdvice.map(pluckText),
            dangerRatings: [data.day1[0], data.day2[0], data.day3[0]].map(
                function(day) {
                    return {
                        date: day.date,
                        dangerRating: {
                            alp: DANGER_RATINGS[day.alp],
                            btl: DANGER_RATINGS[day.btl],
                            tln: DANGER_RATINGS[day.tln],
                        },
                    }
                }
            ),
            problems: data.problems.map(createProblem),
            avalancheSummary: PrismicDOM.RichText.asHtml(data.avalancheSummary),
            snowpackSummary: PrismicDOM.RichText.asHtml(data.snowpackSummary),
            weatherForecast: PrismicDOM.RichText.asHtml(data.weatherForecast),
            dangerMode: 'Regular season',
        }
    },
}

// Utils
function pad(number) {
    if ( number < 10 ) {
      return '0' + number;
    }
    return number;
  }
function getCurrentDateTime() {
    var now = new Date();
    
    return now.getUTCFullYear() +
    '-' + pad( now.getUTCMonth() + 1 ) +
    '-' + pad( now.getUTCDate() ) +
    'T' + pad( now.getUTCHours() ) +
    ':' + pad( now.getUTCMinutes() ) +
    ':' + pad( now.getUTCSeconds() ) +
    // '.' + (now.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    'Z';
}
function createProblem(slice) {
    var ASPECTS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var data = slice.primary;
    var min = data.minSize;
    var max = data.maxSize;
    var likelihood = data.likelihood;
    function isYes(key) {
        return data[key] === 'Yes';
    }

    return {
        type: slice.slice_type,
        elevations: ['Alp', 'Tln', 'Btl'].filter(isYes),
        aspects: ASPECTS.filter(isYes),
        likelihood: likelihood,
        expectedSize: {
            min: min,
            max: max,
        },
        icons: {
            aspects: [
                ASSETS, 
                'Compass/compass-', 
                ASPECTS.map(function(ASPECT) {
                    return Number(data[ASPECT] === 'Yes');
                }).join('-'), 
                '_EN.png'
            ].join(''),
            // ORDER matters, do not reorder the elevations array below
            elevations: [
                ASSETS, 
                'Elevation/Elevation-', 
                [ "Btl", "Tln", "Alp" ].map(function(ELEVATION) {
                    return Number(data[ELEVATION] === 'Yes');
                }).join('-'),
                '_EN.png'
            ].join(''),
            expectedSize: [
                ASSETS, 
                'size/Size-', 
                min.replace('.', ''), 
                '-', 
                max.replace('.', ''), 
                '_EN.png'
            ].join(''),
            likelihood: [
                ASSETS, 
                'Likelihood/Likelihood-', 
                AVALX_LIKELIHOOD_ICON[likelihood], 
                '_EN.png'
            ].join('')
        },
        comment: PrismicDOM.RichText.asHtml(data.comments),
        travelAndTerrainAdvice: '',
    }
}
function pluckText(item) {
    return item.text;
}
function forecastRegionFromName(region) {
    return Object.keys(IDS_TO_NAMES).find(key => IDS_TO_NAMES[key] === region);
}

// CONSTANTS
var ASSETS = 'https://www.avalanche.ca/assets/images/';
var API = 'https://avalancheca.cdn.prismic.io/api/v2';
var IDS_TO_NAMES = {
    cariboos: 'Cariboos',
    kananaskis: 'Kananaskis Country, Alberta Parks',
    'kootenay-boundary': 'Kootenay Boundary',
    'lizard-range': 'Lizard Range and Flathead',
    'north-columbia': 'North Columbia',
    'north-rockies': 'North Rockies',
    'northwest-coastal': 'Northwest Coastal',
    'northwest-inland': 'Northwest Inland',
    purcells: 'Purcells',
    'sea-to-sky': 'Sea To Sky',
    'south-coast': 'South Coast',
    'south-coast-inland': 'South Coast Inland',
    'south-columbia': 'South Columbia',
    'south-rockies': 'South Rockies',
    yukon: 'Yukon',
};
var DANGER_RATINGS = {
    Low: '1:Low',
    Moderate: '2:Moderate',
    Considerable: '3:Considerable',
    High: '4:High',
    Extreme: '5:Extreme',
    'No Rating': 'N/A:No Rating',
};
var AVALX_LIKELIHOOD_ICON = {
    'Certain': 8,
    'Certain - Very Likely': 8,
    'Very Likely': 7,
    'Very Likely - Likely': 6,
    'Likely': 5,
    'Likely - Possible': 4,
    'Possible': 3,
    'Possible - Unlikely': 2,
    'Unlikely': 1,
};
