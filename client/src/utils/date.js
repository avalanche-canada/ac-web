import moment from 'moment'

export function formatAsDay(date) {
    return moment(date).format('YYYY-MM-DD')
}

export function parseFromDay(string) {
    return moment(string, 'YYYY-MM-DD').toDate()
}
