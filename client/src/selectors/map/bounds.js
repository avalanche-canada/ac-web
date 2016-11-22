import {createSelector} from 'reselect'
import mapbox from 'services/mapbox/map'
import {getPrimary, getSecondary} from 'selectors/drawers'
import createBbox from 'turf-bbox'

const {LngLatBounds, LngLat} = mapbox

export const computeOffset = createSelector(
    getPrimary,
    getSecondary,
    (primary, secondary) => (assumePrimaryOpen, assumeSecondaryOpen) => {
        let x = 0

        if (assumePrimaryOpen || primary.open) {
            x -= primary.width / 2
        }
        if (assumeSecondaryOpen || secondary.open) {
            x += secondary.width / 2
        }

        return [x, 0]
    }

)

export const computeFitBounds = createSelector(
    computeOffset,
    computeOffset => (feature, assumePrimaryOpen, assumeSecondaryOpen) => {
        if (!feature) {
            return null
        }

        if (typeof feature.toJSON === 'function') {
            feature = feature.toJSON()
        }

        let bbox = LngLatBounds.convert(createBbox(feature))
        const [[west, south], [east, north]] = bbox.toArray()

        if (north === south || east === west) {
            bbox = new LngLatBounds(
                new LngLat(west - 0.0025, south - 0.0025),
                new LngLat(east + 0.0025, north + 0.0025)
            )
        }

        return {
            bbox,
            options: {
                offset: computeOffset(assumePrimaryOpen, assumeSecondaryOpen),
                padding: 50,
            }
        }
    }
)
