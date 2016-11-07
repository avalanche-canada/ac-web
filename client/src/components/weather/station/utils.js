import moment from 'moment'
import memoize from 'lodash/memoize'

export function getDateExtent(data) {
    const dates = data.map(observation => observation.measurementDateTime)

    return {
        min: new Date(Math.min(...dates)),
        max: new Date(Math.max(...dates)),
    }
}

export function formatHours(date, index) {
    let format = 'HH[h]'

    if (index === 0 || date.getHours() === 0) {
        if (date.getHours() === 0) {
            format = 'YYYY-MM-DD'
        } else {
            format = 'YYYY-MM-DD[\n]HH[h]'
        }
    }

    return moment(date).format(format)
}

export const formatForUnit = memoize(function(unit) {
    return value => `${value} ${unit}`
})
