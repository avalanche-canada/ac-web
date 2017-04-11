import {createAction} from 'redux-actions'
import {fetchSponsors} from '/api'
import {getActiveSponsor, getSponsors} from '/getters/sponsors'
import {DelayPromise} from '/utils/promise'

export const SET_ACTIVE_SPONSOR = 'SET_ACTIVE_SPONSOR'
export const RESET_ACTIVE_SPONSOR = 'RESET_ACTIVE_SPONSOR'

const setActiveSponsorActionCreator = createAction(SET_ACTIVE_SPONSOR)
export function setActiveSponsor(sponsor) {
    return (dispatch, getState) => {
        if (getActiveSponsor(getState()) === sponsor) {
            return
        }

        dispatch(setActiveSponsorActionCreator(sponsor))
    }
}

const resetActiveSponsorActionCreator = createAction(RESET_ACTIVE_SPONSOR)
export function resetActiveSponsor() {
    return (dispatch, getState) => {
        if (!getActiveSponsor(getState())) {
            return
        }

        dispatch(resetActiveSponsorActionCreator())
    }
}

export const GET_SPONSORS = 'GET_SPONSORS'

export function loadSponsors() {
    const creator = createAction(GET_SPONSORS, fetchSponsors)

    return (dispatch, getState) => {
        const sponsors = getSponsors(getState())
        const delay = Object.keys(sponsors || {}).length > 0 ? 10000 : 1

        return DelayPromise(delay).then(() => dispatch(creator()))
    }
}
