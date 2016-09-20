import {createSelector} from 'reselect'
import mapbox from 'mapbox/map'
import {getEntitiesForSchema} from 'reducers/api/entities'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {getPrimary, getSecondary} from 'selectors/drawers'
import bbox from 'turf-bbox'

const {LngLatBounds} = mapbox

const getActiveFeature = createSelector(
    (state, props) => props.params.name,
    (state, props) => props.routes,
    state => getEntitiesForSchema(state, ForecastRegion),
    state => getEntitiesForSchema(state, HotZoneArea),
    (name, routes, forecastRegions, hotZoneAreas) => {
        if (routes.find(route => route.path === 'forecasts')) {
            return forecastRegions.get(name)
        } else if (routes.find(route => route.path === 'hot-zone-reports')) {
            return hotZoneAreas.get(name)
        }
        return null
    }
)

export default createSelector(
    getActiveFeature,
    getPrimary,
    getSecondary,
    (feature, primary, secondary) => {
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
            bbox: LngLatBounds.convert(bbox(feature.toJSON())),
            options: {
                offset: [x, 0],
                padding: 25,
            }
        }
    }
)
