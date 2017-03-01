import * as Layers from 'constants/drawers'
import turf from '@turf/helpers'

const data = turf.featureCollection([])
const type = 'geojson'

const extent = {
    xmin: -118.46607345514553,
    ymin: 50.970683262197014,
    xmax: -118.08955006935989,
    ymax: 51.13845267759706,
}

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
    [Layers.SPECIAL_INFORMATION]: {
        type,
        data,
        cluster: true,
    },
    [Layers.FATAL_ACCIDENT]: {
        type,
        data,
    },
    [Layers.ATES]: {},
}
