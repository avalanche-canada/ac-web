import {createSelector} from 'reselect'
import {Forecast, ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import moment from 'moment'
import {VALUES as RATINGS} from 'constants/forecast/danger/rating'
import {VALUES as MODES} from 'constants/forecast/mode'
import {computeFitBounds} from 'selectors/map/bounds'

// TODO: Use constants server response to reduce client side transformation.
// See Maps below...

const TO_RATINGS = new Map([
    ["1:Low", RATINGS.LOW],
    ["2:Moderate", RATINGS.MODERATE],
    ["3:Considerable", RATINGS.CONSIDERABLE],
    ["4:High", RATINGS.HIGH],
    ["5:Extreme", RATINGS.EXTREME],
    ["N/A:'Spring'", RATINGS.NO_RATING],
    ["N/A:No Rating", RATINGS.NO_RATING],
])
const TO_MODES = new Map([
    ['Off season', MODES.OFF],
    ['Summer situation', MODES.SUMMER],
    ['Spring situation', MODES.SPRING],
    ['Early season', MODES.EARLY_SEASON],
])

function transformDangerRating({date, dangerRating}) {
    const {alp, tln, btl} = dangerRating

    return {
        date: moment(date).toDate(),
        dangerRating: {
            alp: TO_RATINGS.get(alp),
            tln: TO_RATINGS.get(tln),
            btl: TO_RATINGS.get(btl),
        }
    }
}

function trim(text) {
    return typeof text === 'string' ? text.trim() : text
}

// TODO: Have the server to provide it as object instead of a string
function asConfidenceObject(confidence) {
    const [level, comment] = typeof confidence === 'string' ? confidence.split(' - ') : []

    return {
        level,
        comment,
    }
}

function transform(forecast) {
    if (!forecast.region) {
        return forecast
    }

    const {
        dangerRatings = [],
        dateIssued,
        validUntil,
        dangerMode,
        confidence,
        avalancheSummary,
        snowpackSummary,
        weatherForecast
    } = forecast

    const d = moment(dateIssued)
        
    // TODO(wnh): Clean this up and merge it into either the server side or the
    // transformDangerRating function 
    const fixDangerRatingDates = function(x, n){
        let newDate = d.add(n + 1, 'days')
        return Object.assign({}, x, {date: newDate.toDate()})
    } 

    var out =  {
        ...forecast,
        confidence: asConfidenceObject(confidence),
        dangerMode: TO_MODES.get(dangerMode),
        dateIssued: moment(dateIssued).toDate(),
        validUntil: moment(validUntil).toDate(),
        dangerRatings: dangerRatings.map(transformDangerRating).map(fixDangerRatingDates),
        avalancheSummary: trim(avalancheSummary),
        snowpackSummary: trim(snowpackSummary),
        weatherForecast: trim(weatherForecast),
    }
    return out
}

function getForecasts(state) {
    return getEntitiesForSchema(state, Forecast)
}

function getForecastRegion(state, {params}) {
    return getEntityForSchema(state, ForecastRegion, params.name)
}

function getForecastResultSet(state, {params}) {
    return getResultsSet(state, Forecast, params)
}

const getForecast = createSelector(
    getForecasts,
    getForecastResultSet,
    function findForecast(forecasts, resultSet) {
        const [id] = resultSet.ids

        return forecasts.get(id)
    }
)

const getComputeBounds = createSelector(
    getForecastRegion,
    computeFitBounds,
    (region, computeBounds) => () => computeBounds(region)
)

export default createSelector(
    getForecast,
    getForecastRegion,
    getForecastResultSet,
    getComputeBounds,
    (forecast, forecastRegion, result, computeBounds) => {
        const {isFetching, isError, isLoaded} = result

        if (forecast) {
            forecast = transform(forecast.toJSON())
            const {externalUrl, parksUrl, region} = forecast
            let showForecast = false
            let link = null

            if (externalUrl) {
                if (externalUrl === 'http://avalanche.ca/blogs/north-rockies') {
                    link = {
                        to: '/blogs?category=north-rockies'
                    }
                } else {
                    link = {
                        target: '_blank',
                        to: externalUrl,
                    }
                }
            } else if (parksUrl) {
                link = {
                    target: '_blank',
                    to: parksUrl,
                }
            } else {
                showForecast = true
                link = {
                    to: `/forecasts/${region}`,
                }
            }

            return {
                isLoading: isFetching,
                isError,
                isLoaded,
                title: forecast.bulletinTitle || forecast.name || region.name,
                forecast: showForecast ? forecast : null,
                link,
                computeBounds,
            }
        } else {
             return {
                isLoading: isFetching,
                isError,
                isLoaded,
                title: forecastRegion && forecastRegion.getIn(['properties', name]),
                computeBounds,
            }
        }
    }
)
