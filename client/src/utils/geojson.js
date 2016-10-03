import distance from 'turf-distance'
import turf from 'turf-helpers'

const ORIGIN = turf.point([0, 0])
function sorter(a, b) {
    return a.distance - b.distance
}

export function near(targetPoint, points, n = 1) {
    const distances = []
    const {features} = points
    const {length} = features

    for (let i = 0; i < length; i++) {
        distances.push({
            distance: distance(targetPoint, features[i]),
            feature: features[i],
        })
    }

    return turf.featureCollection(
        distances.sort(sorter).slice(0, n).map(({feature}) => feature)
    )
}

// Copied from https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
export function spiral(count = 0, center = ORIGIN, lengthStart = 11, footSeparation = 28) {
    const [centerX, centerY] = center.coordinates
    const results = []
    let legLength = lengthStart
    let angle = 0

    for (let i = 0; i < count; i++) {
        angle += footSeparation / legLength + i * 0.0005

        const x = centerX + legLength * Math.cos(angle)
        const y = centerY + legLength * Math.sin(angle)

        legLength += 2 * Math.PI * lengthStart / angle

        results.push(turf.point([x, y]))
    }

    return results
}

export function explode(count = 0, center = ORIGIN, distance = 28) {
    if (count < 1) {
        return [center]
    }

    const step = 360 / count
    const [centerX, centerY] = center.coordinates
    const results = []
    let angle = 0

    for (let i = 0; i < count; i++) {
        const x = centerX + distance * Math.cos(angle)
        const y = centerY + distance * Math.sin(angle)

        angle += angle

        results.push(turf.point([x, y]))
    }

    return results
}
