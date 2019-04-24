import React, { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'
import { createAction } from 'utils/reducer'

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        opened: false,
        open() {
            dispatch(open())
        },
        close() {
            dispatch(close())
        },
        toggle() {
            dispatch(state.opened ? close() : open())
        },
    })

    return <MenuContext.Provider value={state}>{children}</MenuContext.Provider>
}

const MenuContext = createContext()

export function useMenu() {
    return useContext(MenuContext)
}

// Reducer and actions
const open = createAction('OPEN')
const close = createAction('CLOSE')
function reducer(state, { type }) {
    switch (type) {
        case 'OPEN':
            return {
                ...state,
                opened: true,
            }
        case 'CLOSE':
            return {
                ...state,
                opened: false,
            }
        default:
            return state
    }
}
