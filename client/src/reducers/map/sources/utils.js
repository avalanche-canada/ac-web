import {featureCollection} from 'turf-helpers'

export function createSource({features = [], ...props}) {
    return {
        ...props,
        type: 'geojson',
        data: featureCollection(features),
    }
}

export function setFeatures(sources, id, features = []) {
    const index = sources.findIndex(source => source.id === id)
    const source = sources.get(index)

    return sources.set(index, {
        ...source,
        data: featureCollection(features),
    })
}
