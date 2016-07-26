import {createSelector} from 'reselect'
import {HotZoneArea, HotZoneReport} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import moment from 'moment'

function transform(area) {
    return {
        ...area,
    }
}

function getName(state, {params}) {
    return params.name
}

function getHotZoneArea(state, {params}) {
    return getEntityForSchema(state, HotZoneArea, params.name)
}

function getHotZoneReport(state, {params}) {
    return getEntityForSchema(state, HotZoneReport, params.name)
}

export default createSelector(
    getHotZoneArea,
    getHotZoneReport,
    (area, report) => {
        if (report) {
            report = transform(report.toJSON())

            return {
                isLoading: false,
                title: report.title,
                report,
            }
        } else {
            return {
                isLoading: true,
                title: area && area.getIn(['properties', 'name']),
            }
        }
    }
)
