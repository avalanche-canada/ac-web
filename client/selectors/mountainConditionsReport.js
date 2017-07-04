import { createSelector, createStructuredSelector } from 'reselect'
import { MountainConditionsReport as Schema } from '~/api/schemas'
import { getEntityForSchema } from '~/getters/entities'
import { getResultsSet } from '~/getters/api'
import { computeOffset } from '~/selectors/map/bounds'

function getReport(state, props) {
    return getEntityForSchema(state, Schema, props.id)
}

function getReportStatus(state, { id }) {
    return getResultsSet(state, Schema, { id }).asStatus()
}

const getComputeFlyTo = createSelector(
    getReport,
    computeOffset,
    (report, computeOffset) => () => ({
        center: report.get('location').toArray(),
        zoom: 13,
        offset: computeOffset(),
    })
)

export default createStructuredSelector({
    id(state, props) {
        return props.id
    },
    report: getReport,
    status: getReportStatus,
    computeFlyTo: getComputeFlyTo,
})
