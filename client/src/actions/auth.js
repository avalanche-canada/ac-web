import {createAction} from 'redux-actions'
import Axios from 'axios'
import AuthService from '~/services/auth'
import {getIsAuthenticated} from 'getters/auth'
import {setUserContext} from '~/services/raven'

export const TOKEN_RECEIVED = 'TOKEN_RECEIVED'
export const LOGOUT = 'LOGOUT'
export const GET_PROFILE = 'GET_PROFILE'

const {idToken, profile} = AuthService.create()

if (profile) {
    setUserContext(profile)
}

Axios.defaults.headers.post['Authorization'] = `Bearer ${idToken}`

const getProfile = createAction(GET_PROFILE, () => {
    const auth = AuthService.create()

    return auth.fetchProfile()
})

export function receiveToken(idToken, accessToken) {
    return dispatch => {
        const auth = AuthService.create()

        auth.idToken = idToken
        auth.accessToken = accessToken

        Axios.defaults.headers.post['Authorization'] = `Bearer ${idToken}`

        dispatch({
            type: TOKEN_RECEIVED,
            payload: {
                id: idToken,
                access: accessToken,
            }
        })

        return dispatch(getProfile()).then(profile => {
            setUserContext(profile)
        })
    }
}

export function login() {
    return (dispatch, getState) => {
        if (getIsAuthenticated(getState())) {
            return
        }

        const auth = AuthService.create()

        return auth.login()
    }
}

export function logout() {
    return dispatch => {
        const auth = AuthService.create()

        auth.logout()

        return dispatch({
            type: LOGOUT
        })
    }
}
