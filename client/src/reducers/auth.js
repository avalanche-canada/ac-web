import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import AuthService from 'services/auth'
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    TOKEN_RECEIVED,
} from 'actions/auth'

const auth = AuthService.create()

const Session = Immutable.Record({
    isAuthenticated: false,
    profile: null,
    error: null,
})

export default handleActions({
    [TOKEN_RECEIVED]: session => session.set('isAuthenticated', true),
    [LOGIN_SUCCESS]: (session, {payload}) => session.set('profile', payload),
    [LOGIN_ERROR]: (session, {payload}) => session.set('error', payload),
    [LOGOUT_SUCCESS]: () => new Session(),
}, new Session({
    isAuthenticated: auth.checkTokenExpiry(),
    profile: auth.profile,
}))
