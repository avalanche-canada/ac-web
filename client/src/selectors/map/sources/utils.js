import {featureCollection} from 'turf-helpers'

export function createSource({features = [], ...props}) {
    return {
        ...props,
        type: 'geojson',
        data: featureCollection(features),
    }
}
