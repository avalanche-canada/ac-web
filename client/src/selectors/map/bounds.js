import {createSelector} from 'reselect'
import mapbox from 'services/mapbox/map'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {ForecastRegion, HotZoneArea, MountainInformationNetworkSubmission} from 'api/schemas'
import {getPrimary, getSecondary} from 'selectors/drawers'
import {getSchemaByKey} from 'api/schemas'
import bbox from 'turf-bbox'
import turf from 'turf-helpers'
import circle from 'turf-circle'

const {LngLatBounds} = mapbox
function isForecastRoute({path}) {
    return path === 'forecasts'
}
function isHotZoneReportRoute({path}) {
    return path === 'hot-zone-reports'
}

// TODO: Hmmm, do we really need that function!
// It runs all the time...maybe not desired behavior
const getActiveFeature = createSelector(
    (state, {params}) => params.name,
    (state, {routes}) => routes,
    (state, {location}) => location,
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZoneArea),
    state => getEntitiesForSchema(state, MountainInformationNetworkSubmission),
    (name, routes, location, forecastRegions, hotZoneAreas, submissions) => {
        if (routes.find(isForecastRoute)) {
            return forecastRegions.get(name)
        } else if (routes.find(isHotZoneReportRoute)) {
            return hotZoneAreas.get(name)
        // } else if (location.query.panel) {
        //     const id = location.query.panel.split('/')[1]
        //     const submission = submissions.get(id)
        //
        //     if (!submission) {
        //         return null
        //     }
        //
        //     const [lat, lng] = submission.get('latlng').toArray()
        //
        //     return circle(turf.point([lng, lat]), 10)
        }

        return null
    }
)

export const computeFitBoundsFactory = createSelector(
    getPrimary,
    getSecondary,
    (primary, secondary) => feature => {
        if (!feature) {
            return null
        }
        let x = 0

        if (primary.open) {
            x -= primary.width / 2
        }
        if (secondary.open) {
            x += secondary.width / 2
        }

        return {
            bbox: LngLatBounds.convert(bbox(feature)),
            options: {
                offset: [x, 0],
                padding: 50,
            }
        }
    }
)

export default createSelector(
    getActiveFeature,
    (state, props) => computeFitBoundsFactory(state, props),
    (feature, compute) => {
        if (!feature) {
            return null
        }

        if (typeof feature.toJSON === 'function') {
            feature = feature.toJSON()
        }

        return compute(feature)
    }
)
