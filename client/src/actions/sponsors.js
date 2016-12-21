import {createAction} from 'redux-actions'
import Axios from 'axios'
import format from 'date-fns/format'
import {getActiveSponsor} from 'getters/sponsors'

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
export const resetActiveSponsor = createAction(RESET_ACTIVE_SPONSOR)

export const SPONSORS_REQUEST = 'SPONSORS_REQUEST'
export const SPONSORS_SUCCESS = 'SPONSORS_SUCCESS'
export const SPONSORS_FAILURE = 'SPONSORS_FAILURE'

export function loadSponsors() {
    return (dispatch, getState) => {
        const {sponsors} = getState()
        const delay = sponsors.data ? 10000 : 1

        function onSuccess({data}) {
            const date = format(new Date(),'YYYY-MM-DD')
            const sponsors = data[date] || {}

            dispatch({
                type: SPONSORS_SUCCESS,
                payload: {
                    ...data.default,
                    ...sponsors
                }
            })
        }
        function onFailure(error) {
            dispatch({
                type: SPONSORS_FAILURE,
                payload: error,
                error: true,
            })
        }

        dispatch({
            type: SPONSORS_REQUEST
        })

        return new Promise(resolve => setTimeout(resolve, delay))
            .then(() => Axios.get('/static/sponsors.json'))
            .then(onSuccess, onFailure)
    }
}
