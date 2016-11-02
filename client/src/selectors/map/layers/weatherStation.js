import {WeatherStation} from 'api/schemas'

const key = WeatherStation.getKey()

export default [{
    id: key,
    source: key,
    type: 'symbol',
    layout: {
        visibility: 'visible',
        'icon-image': 'beer-15',
        'icon-allow-overlap': true,
    },
}]
