import {createAction} from 'redux-actions'
import AuthService from 'services/auth'
import {getIsAuthenticated} from 'reducers/auth'

export const TOKEN_RECEIVED = 'TOKEN_RECEIVED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function receiveToken(token) {
    return (dispatch, getState) => {
        const auth = AuthService.create()

        auth.token = token

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
