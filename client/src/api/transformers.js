import {featureCollection} from 'turf-helpers'
import camelcaseKeys from 'camelcase-keys'

function addIdForMapboxGl(feature) {
    // TODO: Remove the piece of code when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed
    // TODO: Payload should be more consistent and always provide an id

    const id = feature.id || feature.properties.id

    feature.properties.id = id
    feature.id = id

    return feature
}

function isHotZone(feature) {
    return feature.properties.type === 'hotzone'
}
function isNotHotZone(feature) {
    return feature.properties.type !== 'hotzone'
}

export function transformForecastRegions({features}) {
    return featureCollection(
        features.filter(isNotHotZone).map(addIdForMapboxGl)
    )
}

export function transformHotZones({features}) {
    return featureCollection(
        features.filter(isHotZone).map(addIdForMapboxGl)
    )
}

export function transformResponseFromDjango({results, ...rest}) {
    return {
        ...rest,
        results: results.map(camelcaseKeys),
    }
}
