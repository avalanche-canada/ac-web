import * as Layers from 'constants/drawers'
import turf from '@turf/helpers'

function createSource(source = {}) {
    const {features = [], ...props} = source

    return {
        ...props,
        type: 'geojson',
        data: turf.featureCollection(features),
    }
}

export default {
    // TODO: Remove when https://github.com/mapbox/mapbox-gl-js/issues/2613 gets resolved
    [`all-${Layers.MOUNTAIN_INFORMATION_NETWORK}`]: createSource(),
    [Layers.MOUNTAIN_INFORMATION_NETWORK]: createSource({
        cluster: true,
        clusterMaxZoom: 14,
    }),
    [Layers.WEATHER_STATION]: createSource({
        cluster: true,
    }),
    [Layers.TOYOTA_TRUCK_REPORTS]: createSource(),
    [Layers.SPECIAL_INFORMATION]: createSource(),
}
