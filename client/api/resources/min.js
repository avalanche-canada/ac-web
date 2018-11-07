import { unstable_createResource as createResource } from 'react-cache'
import { reports, report } from 'api/requests/min'
import {
    sanitizeMountainInformationNetworkSubmission,
    sanitizeMountainInformationNetworkSubmissions,
} from 'api/transformers'
import fetch from 'services/fetch'

export const Report = createResource(id =>
    fetch(report(id)).then(prepareReport)
)
export const Reports = createResource((days = 7) =>
    fetch(reports(days)).then(prepareReports)
)

// Utils
function prepareReports(data) {
    return data
        ? sanitizeMountainInformationNetworkSubmissions(data).sort(sorter)
        : data
}
function prepareReport(data) {
    return data ? sanitizeMountainInformationNetworkSubmission(data) : data
}
function sorter(a, b) {
    return a.datetime < b.datetime
}
