import parse from 'date-fns/parse'
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
    if (date === null || date === undefined) {
        return date
    }

    return parse(date, ...rest)
}

export const addDayToRange = DateUtils.addDayToRange

const OCTOBER = 9
export function startOfSeason(date = new Date()) {
    const year = date.getFullYear()
    const month = date.getMonth()

    return new Date(month < OCTOBER ? year - 1 : year, OCTOBER, 1)
}
