import {createAction} from 'redux-actions'
import AuthService from 'services/auth'
import {getIsAuthenticated} from 'reducers/auth'
import Axios from 'axios'

export const TOKEN_RECEIVED = 'TOKEN_RECEIVED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const auth = AuthService.create()

Axios.defaults.headers.post['Authorization'] = `Bearer ${auth.token}`

export function receiveToken(token) {
    return (dispatch, getState) => {
        auth.token = token

        Axios.defaults.headers.post['Authorization'] = `Bearer ${token}`

        dispatch({
            type: TOKEN_RECEIVED,
            payload: token
        })

        return auth.fetchProfile().then(
            profile => dispatch(loginSuccess(profile)),
            error => dispatch(loginError(error))
        )
    }
}
export function login() {
    return (dispatch, getState) => {
        const state = getState()

        if (getIsAuthenticated(state)) {
            return
        }

        const auth = AuthService.create()

        return auth.login().catch(error => dispatch(loginError(error)))
    }
}
export function logout() {
    return dispatch => {
        const auth = AuthService.create()

        auth.logout()

        return dispatch(logoutSuccess())
    }
}

const loginSuccess = createAction(LOGIN_SUCCESS)
const loginError = createAction(LOGIN_ERROR)
const logoutSuccess = createAction(LOGOUT_SUCCESS)
