import parse from 'date-fns/parse'
import endOfDay from 'date-fns/end_of_day'

// http://www.bt-tb.tpsgc-pwgsc.gc.ca/btb.php?lang=eng&cont=867
// TODO Should eventually switch to options objects
export const DATE = 'dddd, MMMM D, YYYY'
export const DATETIME = 'dddd, MMMM D, YYYY HH:mm'
export const TIME = 'HH:mm'

export function setUTCOffset(date, offset) {
    date = parse(date)

    return date.setHours(
        date.getHours() + date.getTimezoneOffset() / 60 + offset
    )
}

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

export function isStartOfDay(date) {
    return (
        date.getHours() === 0 &&
        date.getMinutes() === 0 &&
        date.getSeconds() === 0 &&
        date.getMilliseconds() === 0
    )
}

export function splitTime(time = 0) {
    const hours = Math.floor(time)
    const minutes = (time - hours) * 60

    return {
        hours,
        minutes,
    }
}
