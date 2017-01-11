import {setUserContext} from 'services/raven'
import {LOGIN_SUCCESS} from 'actions/auth'
import {getProfile} from 'getters/auth'

let profile = null

export default store => next => action => {
    const {type, payload} = action

    if (type === LOGIN_SUCCESS) {
        profile = payload
    } else if (profile === null) {
        profile = getProfile(store.getState())
    }

    if (profile !== null) {
        setUserContext(profile)
    }

    next(action)
}
