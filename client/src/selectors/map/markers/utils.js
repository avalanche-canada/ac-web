import {featureCollection} from 'turf-helpers'

const {assign} = Object

export function createElement({
    width = 50,
    height = 50,
    title,
    alt = title,
    ...rest
}) {
    // FIXME: This will not work on the server ;(
    const element = document.createElement('img')

    element.classList.add('map-marker')

    return assign(element, {
        width,
        height,
        alt,
        title,
        ...rest
    })
}

export function setVisibility(marker, visible) {
    marker.element.classList.toggle('hidden-map-marker', !visible)

    return marker
}
