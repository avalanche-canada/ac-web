import {WeatherStation} from 'api/schemas'

const key = WeatherStation.getKey()
const iconSize = 0.75

export default [{
    id: key,
    source: key,
    type: 'symbol',
    filter: ['!has', 'point_count'],
    layout: {
        visibility: 'visible',
        'icon-image': 'weather-station',
        'icon-allow-overlap': true,
        'icon-size': iconSize,
    },
}, {
    id: `${key}-cluster`,
    source: key,
    type: 'symbol',
    filter: ['has', 'point_count'],
    layout: {
        visibility: 'visible',
        'icon-image': 'weather-station',
        'icon-allow-overlap': true,
        'icon-size': iconSize,
        'text-font': ['Open Sans Extrabold'],
        'text-field': '{point_count}',
        'text-size': 12,
        'text-offset': [-0.75, 0],
    },
    paint: {
        'text-color': '#000000',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2,
    },
}]
