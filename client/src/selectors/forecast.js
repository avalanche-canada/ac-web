import {createSelector} from 'reselect'
import {Forecast, ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import moment from 'moment'
import {VALUES as RATINGS} from 'constants/forecast/danger/rating'
import {VALUES as MODES} from 'constants/forecast/mode'

const TO_RATINGS = new Map([
    ["Low", RATINGS.LOW],
    ["Moderate", RATINGS.MODERATE],
    ["Considerable", RATINGS.CONSIDERABLE],
    ["High", RATINGS.HIGH],
    ["Extreme", RATINGS.EXTREME],
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

function transform(forecast) {
    if (!forecast.region) {
        return forecast
    }

    const {dangerRatings, dateIssued, validUntil, dangerMode, confidence, avalancheSummary, snowpackSummary, weatherForecast} = forecast
    // TODO: Have the server to provide it as object instead of string
    const [level, comment] = confidence.split(' - ')

    return {
        ...forecast,
        confidence: {
            level,
            comment
        },
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

function getName(state, {params}) {
    return params.name
}

const getForecast = createSelector(
    getForecasts,
    getName,
    function findForecast(forecasts, name) {
        return forecasts.find(forecast => (
            forecast.get('region') === name || forecast.get('id') === name
        ))
    }
)

export default createSelector(
    getForecast,
    getForecastRegion,
    getName,
    (forecast, region, name) => {
        region = region && region.get('properties').toJSON()

        if (forecast) {
            forecast = transform(forecast.toJSON())

            return {
                isLoading: false,
                title: forecast.bulletinTitle || forecast.name,
                region,
                forecast,
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
