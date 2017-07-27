import Immutable from 'immutable'
import { handleActions } from 'redux-actions'
import AuthService from '~/services/auth'
import { GET_PROFILE, LOGOUT, TOKEN_RECEIVED } from '~/actions/auth'

const Session = Immutable.Record({
    isAuthenticated: false,
    profile: null,
    error: null,
})

Object.assign(Session, {
    create() {
        const auth = AuthService.create()

        return new Session({
            isAuthenticated: auth.isAuthenticated(),
            profile: auth.profile,
        })
    },
})

export default handleActions(
    {
        [TOKEN_RECEIVED]: session => session.set('isAuthenticated', true),
        [`${GET_PROFILE}_FULFILLED`]: (session, { payload }) =>
            session.set('profile', payload),
        [`${GET_PROFILE}_REJECTED`]: (session, { error }) =>
            session.set('error', error),
        [LOGOUT]: () => Session.create(),
    },
    Session.create()
)
