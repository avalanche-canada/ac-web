import {createSelector} from 'reselect'
import {HotZone, HotZoneReport} from 'api/schemas'
import {getEntityForSchema} from 'getters/entities'
import {getResultsSet} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'
import {computeFitBounds} from 'selectors/map/bounds'

function getName(state, {params}) {
    return params.name
}

function getHotZone(state, {params}) {
    return getEntityForSchema(state, HotZone, params.name)
}

function getHotZoneReport(state, {params}) {
    return getEntityForSchema(state, HotZoneReport, params.name)
}

function getHotZoneReportResultsSet(state, {params}) {
    return getResultsSet(state, HotZoneReport, params) || RESULT

}

const getComputeBounds = createSelector(
    getHotZone,
    computeFitBounds,
    (region, computeBounds) => () => computeBounds(region)
)

export default createSelector(
    getName,
    getHotZone,
    getHotZoneReport,
    getHotZoneReportResultsSet,
    getComputeBounds,
    (name, zone, report, {isFetching, isError, isLoaded}, computeBounds) => {
        if (report) {
            report = report.toJSON()

            return {
                isLoading: isFetching,
                isError,
                isLoaded,
                title: report.report.headline,
                report,
                link: `/hot-zone-reports/${name}`,
                computeBounds,
            }
        } else {
            const name = zone && zone.getIn(['properties', 'name'])

            return {
                isLoading: isFetching,
                isError,
                isLoaded,
                title: isFetching ? name : name && `${name} report is not available`,
                computeBounds,
            }
        }
    }
)
