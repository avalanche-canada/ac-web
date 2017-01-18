import {createSelector} from 'reselect'
import {getEntitiesForSchema} from 'getters/entities'
import {getVisibleLayers} from 'getters/drawers'
import {ForecastRegion} from 'api/schemas'
import mapbox from 'services/mapbox/map'
import * as Layers from 'constants/drawers'
import * as Schemas from 'api/schemas'

function createElement({width = 50, height = 50, title, alt = title, ...rest}) {
    // FIXME: This will not work on the server ;(
    const element = document.createElement('img')

    element.classList.add('map-marker')

    return Object.assign(element, {
        width,
        height,
        alt,
        title,
        ...rest
    })
}
function setVisibility(marker, visible) {
    marker.element.classList.toggle('hidden-map-marker', !visible)

    return marker
}
function createMarker(region) {
    return {
        id: `${Schemas.Forecast.key}:${region.get('id')}`,
        layer: Layers.FORECASTS,
        location: {
            pathname: `/map/forecasts/${region.get('id')}`,
        },
        element: createElement({
            src: region.get('dangerIconUrl'),
            title: region.get('name'),
        }),
        lngLat: mapbox.LngLat.convert(region.get('centroid').toArray()),
        options: {
            offset: [-25, -25]
        },
    }
}

const getTransformedMarkers = createSelector(
    state => getEntitiesForSchema(state, ForecastRegion),
    entities => entities.map(createMarker).toList(),
)

export default createSelector(
    getTransformedMarkers,
    getVisibleLayers,
    (markers, layers) => markers.withMutations(markers => {
        markers.forEach((marker, index) => {
            markers.set(index, setVisibility(marker, layers.has(marker.layer)))
        })
    })
)
