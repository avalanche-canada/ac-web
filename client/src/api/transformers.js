function addIdForMapboxGl(feature) {
    // TODO: Remove the piece of code when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed
    // TODO: Payload should be more consistent and always provide an id

    const id = feature.id || feature.properties.id

    feature.properties.id = id
    feature.id = id

    return feature
}

export function transformForecastRegions(data) {
    const features = data.features.filter(({properties}) => properties.type !== 'hotzone').map(addIdForMapboxGl)

    return Object.assign(data, {features})
}

export function transformHotZoneAreas(data) {
    const features = data.features.filter(({properties}) => properties.type === 'hotzone').map(addIdForMapboxGl)

    return Object.assign(data, {features})
}
