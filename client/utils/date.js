import parse from 'date-fns/parse'

// http://www.bt-tb.tpsgc-pwgsc.gc.ca/btb.php?lang=eng&cont=867
export const DATE = 'dddd, MMMM D, YYYY'
export const DATETIME = 'dddd, MMMM D, YYYY HH:mm'
export const TIME = 'HH:mm'

export function setUTCOffset(date, offset) {
    date = parse(date)

    return date.setHours(date.getHours() + date.getTimezoneOffset() / 60 + offset)
}
