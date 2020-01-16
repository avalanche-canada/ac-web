import React, { createContext, useReducer, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import * as auth from 'services/auth/auth0'
import Accessor from 'services/auth/accessor'
import { setUserContext } from 'services/sentry'

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

            dispatch([Login, profile])
        },
        async resume(hash) {
            const data = await auth.resume(hash)

            dispatch([Resume, data.profile])

            return data
        },
        logout() {
            auth.logout()

            dispatch([Logout])
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

// Reducer
const Login = Symbol('login')
const Resume = Symbol('resume')
const Logout = Symbol('logout')
function reducer(state, [type, payload]) {
    switch (type) {
        case Login:
        case Resume:
            return {
                ...state,
                isAuthenticated: true,
                profile: payload,
            }
        case Logout:
            return {
                ...state,
                isAuthenticated: false,
                profile: null,
            }
        default:
            return state
    }
}
