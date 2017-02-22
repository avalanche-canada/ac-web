import isSameYear from 'date-fns/is_same_year'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import moment from 'moment'

// http://www.bt-tb.tpsgc-pwgsc.gc.ca/btb.php?lang=eng&cont=867
export const DATE = 'dddd, MMMM D, YYYY'
export const DATETIME = 'dddd, MMMM D, YYYY HH:mm'
export const TIME = 'HH:mm'

// TODO: Remove that function, but needs to consider that data could be string or Date
export function formatAsDay(date) {
    return format(parse(date), 'YYYY-MM-DD')
}

export function yesterday() {
    return moment.utc(moment().startOf('day').subtract(1, 'days')).toDate()
}

export function tomorrow() {
    return moment.utc(moment().startOf('day').add(1, 'days')).toDate()
}
