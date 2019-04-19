import React, { createContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as auth from 'services/auth/auth0'
import Accessor from 'services/auth/accessor'
import { setUserContext } from 'services/sentry'

const AuthContext = createContext()

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

            dispatch({
                type: 'LOGIN',
                payload: profile,
            })
        },
        async resume(hash) {
            const data = await auth.resume(hash)

            dispatch({
                type: 'RESUME',
                payload: data.profile,
            })

            return data
        },
        async logout() {
            await auth.logout()

            return Promise.resolve().then(() => {
                dispatch({
                    type: 'LOGOUT',
                })
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
