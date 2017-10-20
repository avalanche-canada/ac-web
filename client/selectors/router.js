import { createSelector } from 'reselect'
import get from 'lodash/get'
import * as turf from '@turf/helpers'

export const getPlace = createSelector(
    (state, props) => props.location,
    location => get(location, 'state.place', null)
)

export const getPlaceAsFeature = createSelector(
    getPlace,
    place => (place && turf.point(place.center)) || null
)
