import {handleActions} from 'redux-actions'
import AuthService from 'services/auth'
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    TOKEN_RECEIVED,
} from 'actions/auth'

const auth = AuthService.create()

// TODO: Could use an Immutable.Record for better performance
const STATE = {
    isAuthenticated: auth.checkTokenExpiry(),
    profile: auth.profile,
    error: null,
}

export default handleActions({
    [TOKEN_RECEIVED]: state => ({
        ...state,
        isAuthenticated: true,
        profile: null,
        error: null,
    }),
    [LOGIN_SUCCESS]: (state, {payload}) => ({
        ...state,
        isAuthenticated: true,
        profile: payload,
        error: null,
    }),
    [LOGIN_ERROR]: (state, {payload}) => ({
        ...state,
        isAuthenticated: false,
        profile: null,
        error: payload,
    }),
    [LOGOUT_SUCCESS]: state => ({
        ...state,
        isAuthenticated: false,
        profile: null,
        error: null,
    }),
}, STATE)

export function getIsAuthenticated(state) {
    return state.auth.isAuthenticated
}
export function getProfile(state) {
    return state.auth.profile
}
