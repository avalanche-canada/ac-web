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
