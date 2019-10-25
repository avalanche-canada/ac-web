import React, { createContext, useReducer, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import * as auth from 'services/auth/auth0'
import Accessor from 'services/auth/accessor'
import { setUserContext } from 'services/sentry'
import { createAction } from 'utils/reducer'

const AuthContext = createContext()

// TODO Remove once not needed anymore
export default AuthContext

Provider.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Provider({ children }) {
    const [value, dispatch] = useReducer(reducer, {
        isAuthenticated: Accessor.isAuthenticated,
        profile: Accessor.profile,
        async login(events) {
            const { profile } = await auth.login(events)

            dispatch(login(profile))
        },
        async resume(hash) {
            const data = await auth.resume(hash)

            dispatch(resume(data.profile))

            return data
        },
        async logout() {
            await auth.logout()

            return Promise.resolve().then(() => {
                dispatch(logout())
            })
        },
    })

    useEffect(() => {
        if (value.profile) {
            setUserContext(value.profile)
        }
    }, [value.profile])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hooks
export function useAuth() {
    return useContext(AuthContext)
}

// Actions
const login = createAction('LOGIN')
const resume = createAction('RESUME')
const logout = createAction('LOGOUT')
// Reducer
function reducer(state, { type, payload }) {
    switch (type) {
        case 'LOGIN':
        case 'RESUME':
            return {
                ...state,
                isAuthenticated: true,
                profile: payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                profile: null,
            }
        default:
            return state
    }
}
