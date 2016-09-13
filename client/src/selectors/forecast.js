import {createSelector} from 'reselect'
import {Forecast, ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'
import moment from 'moment'
import {VALUES as RATINGS} from 'constants/forecast/danger/rating'
import {VALUES as MODES} from 'constants/forecast/mode'

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
    // if (!forecast.region) {
    //     return forecast
    // }

    const {
        dangerRatings,
        dateIssued,
        validUntil,
        dangerMode,
        confidence,
        avalancheSummary,
        snowpackSummary,
        weatherForecast
    } = forecast

    return {
        ...forecast,
        confidence: asConfidenceObject(confidence),
        dangerMode: TO_MODES.get(dangerMode),
        dateIssued: moment(dateIssued).toDate(),
        validUntil: moment(validUntil).toDate(),
        dangerRatings: dangerRatings.map(transformDangerRating),
        avalancheSummary: trim(avalancheSummary),
        snowpackSummary: trim(snowpackSummary),
        weatherForecast: trim(weatherForecast),
    }
}

function getForecasts(state) {
    return getEntitiesForSchema(state, Forecast)
}

function getForecastRegion(state, {params}) {
    return getEntityForSchema(state, ForecastRegion, params.name)
}

function getForecastResultSet(state, {params}) {
    return getResultsSet(state, Forecast, params) || RESULT
}

const getForecast = createSelector(
    getForecasts,
    getForecastResultSet,
    function findForecast(forecasts, resultSet) {
        const [id] = resultSet.ids

        return forecasts.get(id)
    }
)

export default createSelector(
    getForecast,
    getForecastRegion,
    getForecastResultSet,
    (forecast, region, result) => {
        // Getting the region allows to send a name as the bulletin is loading
        region = region && region.get('properties').toJSON()

        if (forecast) {
            forecast = transform(forecast.toJSON())
            const {externalUrl, parksUrl, region} = forecast
            let link = null

            if (externalUrl) {
                link = {
                    target: '_blank',
                    to: externalUrl,
                }
            } else if (parksUrl) {
                link = {
                    target: '_blank',
                    to: parksUrl,
                }
            } else {
                link = {
                    to: `/forecasts/${region}`,
                }
            }

            return {
                isLoading: false,
                title: forecast.bulletinTitle || forecast.name,
                region,
                forecast,
                link,
            }
        } else {
            return {
                isLoading: true,
                title: region && region.name,
                region,
                forecast,
            }
        }
    }
)
