import {createSelector} from 'reselect'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {ForecastRegion, HotZoneArea, MountainInformationNetworkSubmission} from 'api/schemas'

function isForecastRoute({path}) {
    return path === 'forecasts'
}
function isHotZoneReportRoute({path}) {
    return path === 'hot-zone-reports'
}

export default createSelector(
    (state, {params}) => params.name,
    (state, {routes}) => routes,
    (state, {location}) => location,
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZoneArea),
    state => getEntitiesForSchema(state, MountainInformationNetworkSubmission),
    (name, routes, location, forecastRegions, hotZoneAreas, submissions) => {
        let feature = null

        if (routes.find(isForecastRoute)) {
            feature = forecastRegions.get(name)
        } else if (routes.find(isHotZoneReportRoute)) {
            feature = hotZoneAreas.get(name)
        }

        if (feature && typeof feature.toJSON === 'function') {
            feature = feature.toJSON()
        }

        return feature
    }
)
