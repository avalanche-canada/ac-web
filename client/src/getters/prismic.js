import {Map} from 'immutable'
import {formatAsDay} from 'utils/date'
import addDays from 'date-fns/add_days'
import isToday from 'date-fns/is_today'

const MAP = new Map()

export function getDocuments(state) {
    return state.prismic.documents
}

export function getDocumentsOfType(state, type) {
    return getDocuments(state).get(type, MAP)
}

export function getDocumentForUid(state, type, uid) {
    const path = [type, getDocumentId(state, type, uid)]

    return getDocuments(state).getIn(path)
}

export function hasDocumentForUid(state, type, uid) {
    const path = [type, getDocumentId(state, type, uid)]

    return getDocuments(state).hasIn(path)
}

export function getIsFetching(state) {
    return state.prismic.fetchingCounter > 0
}

function getDocumentId({prismic}, type, uid) {
    return prismic.uids.getIn([type, uid])
}

function createFinder(date) {
    date = formatAsDay(date)

    return document => document.data['weather-forecast.date'].value === date
}

export function getWeatherForecast(state, date = new Date(), getYesterday = false) {
    const forecasts = getDocumentsOfType(state, 'weather-forecast')
    const forecast  = forecasts.find(createFinder(date))

    if (forecast) {
        return forecast
    }

    if (getYesterday && isToday(date)) {
        return forecasts.find(createFinder(addDays(date, -1)))
    }
}
