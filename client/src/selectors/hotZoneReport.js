import {createSelector} from 'reselect'
import {HotZoneArea, HotZoneReport} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'
import {computeFitBounds} from 'selectors/map/bounds'

function getName(state, {params}) {
    return params.name
}

function getHotZoneArea(state, {params}) {
    return getEntityForSchema(state, HotZoneArea, params.name)
}

function getHotZoneReport(state, {params}) {
    return getEntityForSchema(state, HotZoneReport, params.name)
}

function getHotZoneReportResultsSet(state, {params}) {
    return getResultsSet(state, HotZoneReport, params) || RESULT

}

const getComputeBounds = createSelector(
    getHotZoneArea,
    computeFitBounds,
    (region, computeBounds) => () => computeBounds(region)
)

export default createSelector(
    getName,
    getHotZoneArea,
    getHotZoneReport,
    getHotZoneReportResultsSet,
    getComputeBounds,
    (name, area, report, {isFetching, isError, isLoaded}, computeBounds) => {
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
            const name = area && area.getIn(['properties', 'name'])

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
