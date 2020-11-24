import isAfter from 'date-fns/is_after'
import { astBaseUrl } from './config'
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
        .then(sortCourses)
}

// Utils & constants
function pluckResults({ results }) {
    return results
}
// FIXME This should be done on the server!
function filterOutPastCourses(courses) {
    const now = new Date()

    return courses.filter(course => isAfter(course.date_end, now))
}
function sortCourses(courses) {
    return courses.sort((a, b) => sortByDate(a, b) || sortByName(a, b))
}
function sortByDate(a, b) {
    return new Date(a.date_start) - new Date(b.date_start)
}
function sortByName(a, b) {
    return a.provider.name.localeCompare(b.provider.name, 'en', {
        sensitivity: 'base',
    })
}
const PARAMS = {
    page_size: 1000,
}
