import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import AuthService from '/services/auth'
import {
    GET_PROFILE,
    LOGOUT,
    TOKEN_RECEIVED,
} from '/actions/auth'

const auth = AuthService.create()

const Session = Immutable.Record({
    isAuthenticated: false,
    profile: null,
    error: null,
})

export default handleActions({
    [TOKEN_RECEIVED]: session => session.set('isAuthenticated', true),
    [`${GET_PROFILE}_FULFILLED`]: (session, {payload}) => session.set('profile', payload),
    [`${GET_PROFILE}_REJECTED`]: (session, {error}) => session.set('error', error),
    [LOGOUT]: () => new Session(),
}, new Session({
    isAuthenticated: auth.checkTokenExpiry(),
    profile: auth.profile,
}))
