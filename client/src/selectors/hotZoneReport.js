import {createSelector} from 'reselect'
import {HotZoneArea, HotZoneReport} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSetForSchema} from 'reducers/api/getters'

function getName(state, params) {
    return params.name
}

function getHotZoneArea(state, {params}) {
    return getEntityForSchema(state, HotZoneArea, params.name)
}

function getHotZoneReport(state, {params}) {
    return getEntityForSchema(state, HotZoneReport, params.name)
}

function getHotZoneReportResultsSet(state, {params}) {
    return getResultsSetForSchema(state, HotZoneReport).null || {}

}

export default createSelector(
    getName,
    getHotZoneArea,
    getHotZoneReport,
    getHotZoneReportResultsSet,
    (name, area, report, {isFetching, isError}) => {
        if (report) {
            report = report.toJSON()

            return {
                isLoading: isFetching,
                isError,
                title: report.title,
                report,
                link: `/hot-zone-reports/${name}`,
            }
        } else {
            const name = area && area.getIn(['properties', 'name'])

            return {
                isLoading: isFetching,
                isError,
                title: isFetching ? name : name && `${name} report is not available`,
            }
        }
    }
)
