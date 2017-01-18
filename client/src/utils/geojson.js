import distance from '@turf/distance'
import turf from '@turf/helpers'

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
