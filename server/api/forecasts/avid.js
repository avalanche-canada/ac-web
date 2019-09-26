

// Utils
function transformForecast(forecast) {
    return Object.assign(forecast, {
        avalancheSummary: `<p>${forecast.avalancheSummary}</p>`,
        snowpackSummary: `<p>${forecast.snowpackSummary}</p>`,
        weatherForecast: `<p>${forecast.weatherForecast}</p>`,
        problems: forecast.problems.map(transformProblem),
        confidence: transformConfidence(forecast.confidence),
        dangerRatings: forecast.dangerRatings
            .map(transformDangerRating)
            .sort((a, b) => new Date(a.date) - new Date(b.date)),
    })
}
function transformDangerRating(dangerRating) {
    return {
        date: dangerRating.date,
        dangerRating: Object.entries(dangerRating.dangerRating).reduce(
            (ratings, [elevation, rating]) => {
                ratings[elevation] = RATINGS.get(rating)

                return ratings
            },
            {}
        ),
    }
}
function transformConfidence(confidence) {
    return {
        level: confidence.rating,
        comment: confidence.statements.join(' '),
    }
}
function transformProblem({
    aspects,
    elevations,
    expectedSize,
    likelihood,
    ...problem
}) {
    return Object.assign(problem, {
        icons: {
            elevations: elevationsIcon(elevations),
            aspects: aspectsIcon(aspects),
            likelihood: likelihoodIcon(likelihood),
            expectedSize: expectedSizeIcon(expectedSize),
        },
    })
}
function aspectsIcon(aspects) {
    return [
        ASSETS,
        'Compass/compass-',
        ASPECTS.map(aspect => Number(aspects.includes(aspect))).join('-'),
        '_EN.png',
    ].join('')
}
function elevationsIcon(elevations) {
    return [
        ASSETS,
        'Elevation/Elevation-',
        ELEVATIONS.map(elevation =>
            Number(elevations.includes(elevation))
        ).join('-'),
        '_EN.png',
    ].join('')
}
function likelihoodIcon(likelihood) {
    return `${ASSETS}Likelihood/Likelihood-${LIKELIHOODS.get(
        likelihood
    )}_EN.png`
}
function expectedSizeIcon({ min, max }) {
    return `${ASSETS}size/Size-${Number(min) * 10}-${Number(max) * 10}_EN.png`
}

// Constants
const ASSETS = 'https://www.avalanche.ca/assets/images/'
const RATINGS = new Map([
    ['low', Constants.LOW],
    ['moderate', Constants.MODERATE],
    ['considerable', Constants.CONSIDERABLE],
    ['high', Constants.HIGH],
    ['extreme', Constants.EXTREME],
])
const ASPECTS = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']
const ELEVATIONS = ['btl', 'tln', 'alp']
const LIKELIHOODS = new Map([
    ['certain', '8'],
    ['certain_verylikely', '8'],
    ['verylikely', '7'],
    ['verylikely_likely', '6'],
    ['likely', '5'],
    ['likely_possible', '4'],
    ['possible', '3'],
    ['possible_unlikely', '2'],
    ['unlikely', '1'],
])
