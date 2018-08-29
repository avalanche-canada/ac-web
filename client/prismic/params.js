import startOfTomorrow from 'date-fns/start_of_tomorrow'
import formatDate from 'date-fns/format'
import isToday from 'date-fns/is_today'
import * as predicates from 'prismic/predicates'
import * as types from 'constants/prismic'

export function uid({ type, uid }) {
    return {
        predicates: [predicates.uid(type, uid)],
    }
}

export function ids(ids) {
    return {
        predicates: [predicates.in('document.id', ids)],
        pageSize: ids.length,
    }
}

export function weatherForecast(date) {
    if (date && !isToday(date)) {
        return {
            predicates: [
                predicates.field(
                    types.WEATHER_FORECAST,
                    'date',
                    formatDate(date, DATE)
                ),
            ],
        }
    } else {
        return {
            predicates: [
                predicates.type(types.WEATHER_FORECAST),
                predicates.dateBefore(
                    `my.${types.WEATHER_FORECAST}.date`,
                    startOfTomorrow()
                ),
            ],
            pageSize: 1,
            orderings: [`my.${types.WEATHER_FORECAST}.date desc`],
        }
    }
}

// Contants
const DATE = 'YYYY-MM-DD'
