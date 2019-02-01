import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { SessionStorage } from 'services/storage'

const MapStateContext = createContext()

export default MapStateContext

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        zoom: STORAGE.get('zoom', ZOOM),
        center: STORAGE.get('center', CENTER),
        setZoom(zoom) {
            dispatch(set({ zoom }))
            STORAGE.set('zoom', zoom)
        },
        setCenter(center) {
            dispatch(set({ center }))
            STORAGE.set('center', center)
        },
    })

    return (
        <MapStateContext.Provider value={state}>
            {children}
        </MapStateContext.Provider>
    )
}

export const Consumer = MapStateContext.Consumer

// Constants
const SET = 'set'
const STORAGE = SessionStorage.create({ keyPrefix: 'map:state' })
const CENTER = [-125.15, 54.8]
const ZOOM = 4.3

// Utils
function set(payload) {
    return {
        type: SET,
        payload,
    }
}
function reducer(state, { type, payload }) {
    switch (type) {
        case SET:
            return {
                ...state,
                ...payload,
            }
        default:
            return state
    }
}
