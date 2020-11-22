import * as React from 'react'
import PropTypes from 'prop-types'
import * as Products from 'constants/products'
import { useLocalStorage } from 'hooks'

Provider.propTypes = {
    children: PropTypes.element,
}

export function Provider({ children }) {
    const [layers, setLayers] = useLocalStorage('map-layers', LAYERS)

    React.useEffect(() => {
        setLayers(resetLayers(layers))
    }, [])

    const value = React.useMemo(() => {
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
    return React.useContext(LayersContext)
}

export function useLayer(id) {
    const { layers, toggle, setFilterValue } = useLayers()

    return React.useMemo(
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
        [Products.WEATHER_STATION]: {
            ...LAYERS[Products.WEATHER_STATION],
            visible: data[Products.WEATHER_STATION].visible,
        },
        [Products.ACCIDENT]: {
            ...LAYERS[Products.ACCIDENT],
            visible: data[Products.ACCIDENT].visible,
        },
    }
}
const LAYERS = {
    [Products.FORECAST]: {
        visible: true,
    },
    [Products.ADVISORY]: {
        visible: true,
    },
    [Products.MOUNTAIN_CONDITIONS_REPORT]: {
        visible: false,
    },
    [Products.WEATHER_STATION]: {
        visible: true,
    },
    [Products.MOUNTAIN_INFORMATION_NETWORK]: {
        visible: true,
        filters: {
            days: 7,
            types: new Set(),
        },
    },
    [Products.ACCIDENT]: {
        visible: false,
    },
}

const LayersContext = React.createContext(LAYERS)
