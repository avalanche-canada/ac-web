import { unstable_createResource as createResource } from 'react-cache'
import { reports } from 'api/requests/mcr'
import fetch from 'services/fetch'

export const Reports = createResource(() => fetch(reports()))
export const Report = {
    ...Reports,
    read(id) {
        try {
            const reports = Reports.read()

            return reports.find(report => report.id === id)
        } catch (promise) {
            throw promise
        }
    },
}
