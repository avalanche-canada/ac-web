import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        opened: false,
        open() {
            dispatch({ type: OPEN })
        },
        close() {
            dispatch({ type: CLOSE })
        },
        toggle() {
            dispatch({ type: state.opened ? CLOSE : OPEN })
        },
    })

    return <MenuContext.Provider value={state}>{children}</MenuContext.Provider>
}

const MenuContext = createContext()

export default MenuContext

// Constants
const OPEN = 'OPEN'
const CLOSE = 'CLOSE'

// Utils
function reducer(state, { type }) {
    switch (type) {
        case OPEN:
            return {
                ...state,
                opened: true,
            }
        case CLOSE:
            return {
                ...state,
                opened: false,
            }
        default:
            return state
    }
}
