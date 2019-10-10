var rp = require('request-promise')
var logger = require('../../../logger')
var PrismicDOM = require('prismic-dom')

module.exports = {
    fetch: function(region) {
        if (!IDS_TO_NAMES.hasOwnProperty(region)) {
            logger.debug('prismic avalanche forecast %s not available.', region)

            return
        }

        const name = IDS_TO_NAMES[region]
        logger.debug('fetching prismic avalanche forecast %s', name)

        return rp(API).then(payload => {
            var ref = payload.refs.find(ref => ref.isMasterRef).ref
            var url = [
                API,
                '/search?ref=',
                ref,
                '&q=[',
                '[at(my.avalanche-forecast.region,"',
                name,
                '"]',
                ']',
            ]

            return rp(url.join('')).then(payload => payload.results[0])
        })
    },
    parse: function({
        id,
        data,
        first_publication_date,
        /* last_publication_date is the date document has been republished! */
    }) {
        var confidence = data.confidence[0]

        return {
            id: id,
            region: forecastRegionFromName(data.region),
            fxFormat: 'avid',
            forecaster: data.forecaster,
            dateIssued: first_publication_date,
            validUntil: data.validUntil,
            bulletinTitle: data.region,
            highlights: PrismicDOM.RichText.asText(data.headline),
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
function createProblem(slice) {
    var data = slice.primary
    var min = data.minSize
    var max = data.maxSize
    function isYes(key) {
        return data[key] === 'Yes'
    }

    return {
        type: slice.slice_type,
        elevations: ['Alp', 'Tln', 'Btl'].filter(isYes),
        aspects: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].filter(isYes),
        likelihood: data.likelihood,
        expectedSize: {
            min: min,
            max: max,
        },
        icons: {
            aspects:
                'https://www.avalanche.ca/assets/images/Compass/compass-' +
                '-' +
                '-' +
                '-' +
                '-' +
                '-' +
                '-' +
                '-' +
                '_EN.png',
            elevations:
                'https://www.avalanche.ca/assets/images/Elevation/Elevation-' +
                '-' +
                '-' +
                '_EN.png',
            expectedSize:
                'https://www.avalanche.ca/assets/images/size/Size-' +
                '-' +
                '_EN.png',
            likelihood:
                'https://www.avalanche.ca/assets/images/Likelihood/Likelihood-' +
                '_EN.png',
        },
        comment: PrismicDOM.RichText.asHtml(data.comments),
        travelAndTerrainAdvice: '',
    }
}
function pluckText(item) {
    return item.text
}
function forecastRegionFromName(region) {
    return Object.keys(IDS_TO_NAMES).find(key => IDS_TO_NAMES[key] === region)
}

// CONSTANTS
var API = 'https://avalancheca.cdn.prismic.io/api/v2'
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
}
var DANGER_RATINGS = {
    Low: '1:Low',
    Moderate: '2:Moderate',
    Considerable: '3:Considerable',
    High: '4:High',
    Extreme: '5:Extreme',
    'No Rating': 'N/A:No Rating',
}
