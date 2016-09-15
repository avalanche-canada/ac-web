import {createAction} from 'redux-actions'
import Axios from 'axios'
import moment from 'moment'

export const SET_ACTIVE_SPONSOR = 'SET_ACTIVE_SPONSOR'
export const RESET_ACTIVE_SPONSOR = 'RESET_ACTIVE_SPONSOR'

export const setActiveSponsor = createAction(SET_ACTIVE_SPONSOR)
export const resetActiveSponsor = createAction(RESET_ACTIVE_SPONSOR)

export const SPONSORS_REQUEST = 'SPONSORS_REQUEST'
export const SPONSORS_SUCCESS = 'SPONSORS_SUCCESS'
export const SPONSORS_FAILURE = 'SPONSORS_FAILURE'

export function loadSponsors() {
    return dispatch => {
        dispatch({
            type: SPONSORS_REQUEST
        })

        function onSuccess({data}) {
            const date = moment().format('YYYY-MM-DD')
            const sponsors = data[data] || {}

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

        return Axios.get('/static/sponsors.json').then(onSuccess, onFailure)
    }
}
