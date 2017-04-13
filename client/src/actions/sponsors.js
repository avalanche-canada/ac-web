import {createAction} from 'redux-actions'
import {fetchSponsors} from 'api'
import {getActiveSponsor, getSponsors} from 'getters/sponsors'
import {createDelayedAction, createOptimisticAction} from 'utils/redux'

export const SET_ACTIVE_SPONSOR = 'SET_ACTIVE_SPONSOR'
export const RESET_ACTIVE_SPONSOR = 'RESET_ACTIVE_SPONSOR'

export const setActiveSponsor = createOptimisticAction(
    (state, sponsor) => getActiveSponsor(state) !== sponsor,
    createAction(SET_ACTIVE_SPONSOR)
)

export const resetActiveSponsor = createOptimisticAction(
    state => Boolean(getActiveSponsor(state)),
    createAction(RESET_ACTIVE_SPONSOR)
)

export const GET_SPONSORS = 'GET_SPONSORS'

export const loadSponsors = createDelayedAction(
    state => Object.keys(getSponsors(state) || {}).length > 0 ? 10000 : 1,
    createAction(GET_SPONSORS, fetchSponsors)
)
