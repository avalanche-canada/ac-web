import {createSelector} from 'reselect'
import mapbox from 'services/mapbox/map'
import {getPrimary, getSecondary} from 'selectors/drawers'
import bbox from 'turf-bbox'

const {LngLatBounds} = mapbox

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

        return {
            bbox: LngLatBounds.convert(bbox(feature)),
            options: {
                offset: computeOffset(assumePrimaryOpen, assumeSecondaryOpen),
                padding: 50,
            }
        }
    }
)
