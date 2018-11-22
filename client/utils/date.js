import parse from 'date-fns/parse'
import endOfDay from 'date-fns/end_of_day'
import { DateUtils } from 'react-day-picker'

// http://www.bt-tb.tpsgc-pwgsc.gc.ca/btb.php?lang=eng&cont=867
export const DATE = 'dddd, MMMM D, YYYY'
export const DATETIME = 'dddd, MMMM D, YYYY HH:mm'
export const TIME = 'HH:mm'

export function setUTCOffset(date, offset) {
    date = parse(date)

    return date.setHours(
        date.getHours() + date.getTimezoneOffset() / 60 + offset
    )
}

export function lazyParse(date, ...rest) {
    return date ? parse(date, ...rest) : date
}

export const { addDayToRange } = DateUtils

export function startOfSeason(date = new Date()) {
    const year = date.getFullYear()
    const octoberFirst = new Date(year, 9, 1)

    return date < octoberFirst ? new Date(year - 1, 9, 1) : octoberFirst
}

export function endOfSeason(date = new Date()) {
    const year = date.getFullYear()
    const september30 = endOfDay(new Date(year, 8, 30))

    return date > september30 ? new Date(year + 1, 8, 30) : september30
}
