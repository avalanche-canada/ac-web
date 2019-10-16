import isAfter from 'date-fns/is_after'
import * as urls from '../urls/ast'
import fetch from 'utils/fetch'

export function providers() {
    return fetch(urls.providers()).then(pluckResults)
}

export function courses() {
    return fetch(urls.courses())
        .then(pluckResults)
        .then(courses => {
            const now = new Date()

            return courses.filter(course => isAfter(course.date_end, now))
        })
}

// Utils
function pluckResults({ results }) {
    return results
}
