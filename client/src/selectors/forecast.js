import {createSelector} from 'reselect'
import {Forecast} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/entities'
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

function transform(forecast) {
    const {dangerRatings, dateIssued, validUntil, dangerMode, confidence} = forecast
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
    }
}



function getForecasts(state) {
    return getEntitiesForSchema(state, Forecast)
}

function getName(state, {params}) {
    return params.name
}

export const getForecast = createSelector(
    getForecasts,
    getName,
    (forecasts, name) => {
        const forecast = forecasts.find(forecast => {
            return forecast.get('region') === name
        })

        if (forecast) {
            return {
                isLoading: false,
                forecast: transform(forecast.toJSON()),
            }
        } else {
            return {
                isLoading: true,
            }
        }
    }
)
