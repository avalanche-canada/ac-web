import {createSelector} from 'reselect'
import {HotZoneArea, HotZoneReport} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import * as Columns from './columns'

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

export default createSelector(
    getName,
    getHotZoneArea,
    getHotZoneReport,
    getHotZoneReportResultsSet,
    (name, area, report, {isFetching, isError, isLoaded}) => {
        if (report) {
            report = report.toJSON()

            return {
                isFetching,
                isError,
                isLoaded,
                title: report.report.headline,
                report,
                link: `/hot-zone-reports/${name}`,
            }
        } else {
            const name = area && area.getIn(['properties', 'name'])

            return {
                isFetching,
                isError,
                isLoaded,
                title: isFetching ? name : name && `${name} report is not available`,
            }
        }
    }
)
