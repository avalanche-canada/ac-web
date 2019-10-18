import isAfter from 'date-fns/is_after'
import { astBaseUrl } from './config.json'
import { build } from 'utils/url'
import fetch from 'utils/fetch'

export function providers() {
    const url = build('/providers', PARAMS, astBaseUrl)

    return fetch(url).then(pluckResults)
}

export function courses() {
    const url = build('/courses', PARAMS, astBaseUrl)

    return fetch(url)
        .then(pluckResults)
        .then(filterOutPastCourses)
}

// Utils & constants
function pluckResults({ results }) {
    return results
}
function filterOutPastCourses(courses) {
    const now = new Date()

    return courses.filter(course => isAfter(course.date_end, now))
}
const PARAMS = {
    page_size: 1000,
}
