import Immutable from 'immutable'
import {createSelector} from 'reselect'
import createBbox from 'turf-bbox'
import turf from 'turf-helpers'
import mapbox from 'services/mapbox/map'
import {getActiveFeatures} from 'selectors/map/feature'
import {getPrimary, getSecondary} from 'selectors/drawers'

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
    computeOffset => (feature, assumePrimaryOpen, assumeSecondaryOpen, options = {}) => {
        if (!feature) {
            return null
        }

        let bbox = null

        if (Immutable.Iterable.isIterable(feature)) {
            if (feature.has('bbox')) {
                bbox = feature.get('bbox').toJSON()
            } else if (feature.has('geometry')) {
                const geometry = feature.get('geometry').toJSON()

                bbox = createBbox(turf.feature(geometry))
            } else {
                return null
            }
        } else {
            bbox = createBbox(feature)
        }

        if (bbox.some(isNaN) || !bbox.every(isFinite)) {
            return null
        }

        const [west, south, east, north] = bbox

        if (north === south || east === west) {
            bbox = new LngLatBounds(
                new LngLat(west - 0.0025, south - 0.0025),
                new LngLat(east + 0.0025, north + 0.0025)
            )
        }

        return {
            bbox: new LngLatBounds([west, south], [east, north]),
            options: {
                offset: computeOffset(assumePrimaryOpen, assumeSecondaryOpen),
                padding: 50,
                ...options,
            }
        }
    }
)

export default createSelector(
    computeFitBounds,
    getActiveFeatures,
    (computeFitBounds, activeFeatures) => computeFitBounds(activeFeatures)
)
