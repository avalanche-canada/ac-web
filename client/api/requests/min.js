import * as urls from '../urls/min'
import fetch from 'utils/fetch'

export function report(id) {
    return fetch(urls.report(id)).then(parse)
}

export function reports(days = 7) {
    return fetch(urls.reports(days)).then(reports =>
        reports.map(parse).sort(sorter)
    )
}

export function post() {
    return fetch(urls.post())
}

// Parser & utils
function parse(submission) {
    const { latlng } = submission

    return Object.assign({}, submission, {
        // TODO Fix that double latitude/longituge object, we do not need both!!!
        latlng: latlng.map(Number),
        lnglat: latlng.map(Number).reverse(),
        datetime: new Date(submission.datetime),
    })
}
function sorter(a, b) {
    return a.datetime < b.datetime
}
