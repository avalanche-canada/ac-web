import parseDate from 'date-fns/parse'
import isBefore from 'date-fns/is_before'
import isValid from 'date-fns/is_valid'
import startOfToday from 'date-fns/start_of_today'
import { baseURL } from './config.json'
import fetch from 'utils/fetch'
import * as utils from 'utils/url'

export function forecast(name, date) {
    const url = buildForecastURL(name, date)

    return fetch(url)
}

export function forecasts() {
    const url = buildForecastURL('all')

    return fetch(url)
}

export function regions() {
    const url = baseURL + '/forecasts'

    return fetch(url).then(payload => ({
        ...payload,
        features: payload.features.filter(
            region => region.properties.type !== 'hotzone'
        ),
    }))
}

export function archiveForecastRegions(season) {
    const url = utils.path(baseURL, 'bulletin-archive', season, 'regions.json')

    return fetch(url)
}

// Utils
function buildForecastURL(name, date) {
    let path = 'forecasts'

    if (date && isArchiveBulletinRequest(date)) {
        const data = parseDate(date)

        path = 'bulletin-archive/' + data.toISOString()
    }

    return utils.path(baseURL, path, name + '.json')
}
function isArchiveBulletinRequest(date) {
    date = parseDate(date, 'YYYY-MM-DD')

    if (isValid(date)) {
        return isBefore(date, startOfToday())
    }

    return false
}
