import { createSelector } from 'reselect'
import turf from '@turf/helpers'
import { getGeolocation } from 'getters/geolocation'

export const getLocationAsFeature = createSelector(getGeolocation, location => {
    if (location && location.coords) {
        const { longitude, latitude } = location.coords

        return turf.point([longitude, latitude])
    }
})
