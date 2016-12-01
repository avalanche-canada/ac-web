import {createSelector} from 'reselect'
import {getEntitiesForSchema} from 'getters/entities'
import {ForecastRegion, HotZone, MountainInformationNetworkSubmission} from 'api/schemas'

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
    state => getEntitiesForSchema(state, HotZone),
    state => getEntitiesForSchema(state, MountainInformationNetworkSubmission),
    (name, routes, location, forecastRegions, hotZones, submissions) => {
        let feature = null

        if (routes.find(isForecastRoute)) {
            feature = forecastRegions.get(name)
        } else if (routes.find(isHotZoneReportRoute)) {
            feature = hotZones.get(name)
        }

        return feature
    }
)
