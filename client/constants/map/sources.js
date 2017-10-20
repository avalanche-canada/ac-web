import * as Layers from 'constants/drawers'
import turf from '@turf/helpers'

const data = turf.featureCollection([])
const type = 'geojson'

export default {
    [Layers.MOUNTAIN_INFORMATION_NETWORK_INCIDENTS]: {
        type,
        data,
    },
    [Layers.MOUNTAIN_INFORMATION_NETWORK]: {
        type,
        data,
        cluster: true,
        clusterMaxZoom: 14,
    },
    [Layers.WEATHER_STATION]: {
        type,
        data,
        cluster: true,
    },
    [Layers.TOYOTA_TRUCK_REPORTS]: {
        type,
        data,
    },
    [Layers.MOUNTAIN_CONDITIONS_REPORTS]: {
        type,
        data,
        cluster: true,
    },
    [Layers.SPECIAL_INFORMATION]: {
        type,
        data,
        cluster: true,
    },
    [Layers.FATAL_ACCIDENT]: {
        type,
        data,
    },
}
