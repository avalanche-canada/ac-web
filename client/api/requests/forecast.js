import isValid from 'date-fns/is_valid'
import isBefore from 'date-fns/is_before'
import startOfToday from 'date-fns/start_of_today'
import parse from 'date-fns/parse'
import { get } from 'services/fetch/requests'
import { baseURL } from 'api/config.json'

export function forecast(name, date) {
    let path = 'forecasts'

    if (isArchiveBulletinRequest(date)) {
        const data = parse(date)

        path = `bulletin-archive/${data.toISOString()}`
    }

    return get(`${baseURL}/${path}/${name}.json`)
}

// Utils
function isArchiveBulletinRequest(date) {
    if (!date) {
        return false
    }

    date = parse(date, 'YYYY-MM-DD')

    if (isValid(date)) {
        return isBefore(date, startOfToday())
    }

    return false
}
