import {featureCollection, point} from 'turf-helpers'

export function createSource({features = [], ...props}) {
    return {
        ...props,
        type: 'geojson',
        data: featureCollection(features),
    }
}

export function createCentroid({properties: {centroid, ...props}}) {
    return point(centroid, props)
}
