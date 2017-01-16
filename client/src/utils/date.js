import isSameYear from 'date-fns/is_same_year'
import format from 'date-fns/format'
import moment from 'moment'

export function formatAsDay(date) {
    return moment(date).format('YYYY-MM-DD')
}

export function parseFromDay(string) {
    return moment(string, 'YYYY-MM-DD').toDate()
}

export function yesterday() {
    return moment.utc(moment().startOf('day').subtract(1, 'days')).toDate()
}

export function tomorrow() {
    return moment.utc(moment().startOf('day').add(1, 'days')).toDate()
}

export function dateFormat(date) {
    return isSameYear(date, new Date()) ? 'dddd, MMMM D' : 'dddd, MMMM D, YYYY'
}

export function formatDate(date) {
    return format(date, dateFormat(date))
}
