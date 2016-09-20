import {featureCollection} from 'turf-helpers'

const {assign} = Object

export const POSITIONS = new Map([
    [1, new Map([
        [0, ''],
    ])],
    [2, new Map([
        [0, 'top: -25px;'],
        [1, 'top: 25px;'],
    ])],
    [3, new Map([
        [0, 'top: 25px; left: 25px;'],
        [1, 'top: 25px; left: 25px;'],
        [2, 'top: 25px; left: 25px;'],
    ])],
    [4, new Map([
        [0, 'top: 25px; left: 25px;'],
        [1, 'top: -25px; left: 25px;'],
        [2, 'top: -25px; left: -25px;'],
        [3, 'top: -25px; left: 25px;'],
    ])],
    [5, new Map([
        [0, 'top: 25px; left: 25px;'],
        [1, 'top: -25px; left: 25px;'],
        [2, 'top: -25px; left: -25px;'],
        [3, 'top: -25px; left: 25px;'],
        [4, 'top: 25px; left: -25px;'],
    ])],
    [6, new Map([
        [0, 'top: 25px; left: 25px;'],
        [1, 'top: -25px; left: 25px;'],
        [2, 'top: -25px; left: -25px;'],
        [3, 'top: -25px; left: 25px;'],
        [4, 'top: 25px; left: -25px;'],
        [5, 'top: 25px; left: -25px;'],
    ])],
])


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
