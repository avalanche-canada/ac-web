import {createSelector} from 'reselect'
import mapbox from 'services/mapbox/map'
import {getPrimary, getSecondary} from 'selectors/drawers'
import bbox from 'turf-bbox'

const {LngLatBounds} = mapbox

export const computeFitBoundsFactory = createSelector(
    getPrimary,
    getSecondary,
    (primary, secondary) => (feature, assumePrimaryOpen, assumeSecondaryOpen) => {
        if (!feature) {
            return null
        }
        let x = 0

        if (assumePrimaryOpen || primary.open) {
            x -= primary.width / 2
        }
        if (assumeSecondaryOpen || secondary.open) {
            x += secondary.width / 2
        }

        return {
            bbox: LngLatBounds.convert(bbox(feature)),
            options: {
                offset: [x, 0],
                padding: 50,
            }
        }
    }
)
