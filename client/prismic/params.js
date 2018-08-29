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

export function all(type) {
    return {
        predicates: [predicates.type(type)],
    }
}

export function ids(ids) {
    return {
        predicates: [predicates.in('document.id', ids)],
        pageSize: ids.length,
    }
}

export function mwf(date) {
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

export function sponsor(id) {
    return uid({
        type: types.SPONSOR,
        uid: id,
    })
}

export const fatal = {
    accident(id) {
        return uid({
            type: types.FATAL_ACCIDENT,
            uid: id,
        })
    },
    accidents() {
        return all(types.FATAL_ACCIDENT)
    },
}

export const toyota = {
    truck(id) {
        return uid({
            type: types.TOYOTA_TRUCK_REPORT,
            uid: id,
        })
    },
    trucks() {
        return all(types.TOYOTA_TRUCK_REPORT)
    },
}

export const special = {
    report(id) {
        return uid({
            type: types.SPECIAL_INFORMATION,
            uid: id,
        })
    },
    reports() {
        return all(types.SPECIAL_INFORMATION)
    },
}

// Contants
const DATE = 'YYYY-MM-DD'
