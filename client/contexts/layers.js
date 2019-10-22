import React, { createContext, useContext, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as LAYER_IDS from 'constants/drawers'
import { useLocalStorage } from 'hooks'

Provider.propTypes = {
    children: PropTypes.element,
}

export function Provider({ children }) {
    const [layers, setLayers] = useLocalStorage('layers', LAYERS)

    useEffect(() => {
        setLayers(resetLayers(layers))
    }, [])

    // TODO Not sure "useMemo" helps!
    const value = useMemo(() => {
        return {
            layers,
            toggle(id) {
                setLayers({
                    ...layers,
                    [id]: {
                        ...layers[id],
                        visible: !layers[id].visible,
                    },
                })
            },
            setFilterValue(id, name, value) {
                setLayers({
                    ...layers,
                    [id]: {
                        ...layers[id],
                        filters: {
                            ...layers[id].filters,
                            [name]: value,
                        },
                    },
                })
            },
        }
    }, [layers])

    return (
        <LayersContext.Provider value={value}>
            {children}
        </LayersContext.Provider>
    )
}

// Hooks
export function useLayers() {
    return useContext(LayersContext)
}

export function useLayer(id) {
    const { layers, toggle, setFilterValue } = useLayers()

    return useMemo(
        () => ({
            ...layers[id],
            toggle() {
                toggle(id)
            },
            setFilterValue(name, value) {
                setFilterValue(id, name, value)
            },
        }),
        [layers, id]
    )
}

// Utils & constants
function resetLayers(data) {
    // TODO Simplify the implementation: only few properties need to be transfered, also LAYERS should be deeply cloned!

    return {
        ...LAYERS,
        [LAYER_IDS.MOUNTAIN_CONDITIONS_REPORTS]: {
            ...LAYERS[LAYER_IDS.MOUNTAIN_CONDITIONS_REPORTS],
            visible: data[LAYER_IDS.MOUNTAIN_CONDITIONS_REPORTS].visible,
        },
        [LAYER_IDS.WEATHER_STATION]: {
            ...LAYERS[LAYER_IDS.WEATHER_STATION],
            visible: data[LAYER_IDS.WEATHER_STATION].visible,
        },
        [LAYER_IDS.MOUNTAIN_INFORMATION_NETWORK]: {
            ...LAYERS[LAYER_IDS.MOUNTAIN_INFORMATION_NETWORK],
            filters: {
                ...LAYERS[LAYER_IDS.MOUNTAIN_INFORMATION_NETWORK].filters,
                days: data[LAYER_IDS.MOUNTAIN_INFORMATION_NETWORK].filters.days,
            },
        },
        [LAYER_IDS.FATAL_ACCIDENT]: {
            ...LAYERS[LAYER_IDS.FATAL_ACCIDENT],
            visible: data[LAYER_IDS.FATAL_ACCIDENT].visible,
        },
    }
}
const LAYERS = {
    [LAYER_IDS.FORECASTS]: {
        visible: true,
    },
    [LAYER_IDS.HOT_ZONE_REPORTS]: {
        visible: true,
    },
    [LAYER_IDS.MOUNTAIN_CONDITIONS_REPORTS]: {
        visible: true,
    },
    [LAYER_IDS.WEATHER_STATION]: {
        visible: true,
    },
    [LAYER_IDS.MOUNTAIN_INFORMATION_NETWORK]: {
        visible: true,
        filters: {
            days: 7,
            types: new Set(),
        },
    },
    [LAYER_IDS.FATAL_ACCIDENT]: {
        visible: false,
    },
}
const LayersContext = createContext(LAYERS)
