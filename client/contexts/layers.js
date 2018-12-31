import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import * as LAYERS from 'constants/drawers'
import { LocalStorage } from 'services/storage'

const LayersContext = createContext(LAYERS)

const VISIBILITY = LocalStorage.create({
    keyPrefix: 'layers-visibility',
})
const FILTERS = LocalStorage.create({
    keyPrefix: 'layers-filters',
})

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element,
    }
    state = {
        [LAYERS.FORECASTS]: {
            visible: true,
        },
        [LAYERS.HOT_ZONE_REPORTS]: {
            visible: true,
        },
        [LAYERS.MOUNTAIN_CONDITIONS_REPORTS]: {
            visible: getVisibility(LAYERS.MOUNTAIN_CONDITIONS_REPORTS, true),
        },
        [LAYERS.WEATHER_STATION]: {
            visible: getVisibility(LAYERS.WEATHER_STATION, true),
        },
        [LAYERS.MOUNTAIN_INFORMATION_NETWORK]: {
            visible: true,
            filters: {
                days: Number(
                    FILTERS.get(
                        `${LAYERS.MOUNTAIN_INFORMATION_NETWORK}-days`,
                        7
                    ) || 7
                ),
                types: new Set(),
            },
        },
        [LAYERS.FATAL_ACCIDENT]: {
            visible: getVisibility(LAYERS.FATAL_ACCIDENT, false),
        },
        [LAYERS.SPECIAL_INFORMATION]: {
            visible: true,
        },
    }
    get value() {
        return {
            layers: this.state,
            toggle: this.toggle,
            setFilterValue: this.setFilterValue,
        }
    }
    toggle = id => {
        this.setState(
            state => ({
                [id]: {
                    ...state[id],
                    visible: !state[id].visible,
                },
            }),
            () => {
                VISIBILITY.set(id, this.state[id].visible)
            }
        )
    }
    setFilterValue = (id, name, value) => {
        this.setState(
            state => ({
                [id]: {
                    ...state[id],
                    filters: {
                        ...state[id].filters,
                        [name]: value,
                    },
                },
            }),
            () => {
                FILTERS.set(`${id}-${name}`, value)
            }
        )
    }
    render() {
        return (
            <LayersContext.Provider value={this.value}>
                {this.props.children}
            </LayersContext.Provider>
        )
    }
}

export class Layer extends Component {
    static propTypes = {
        id: PropTypes.oneOf(LAYERS.default).isRequired,
        children: PropTypes.func.isRequired,
    }
    static contextType = LayersContext
    toggle = () => {
        this.context.toggle(this.props.id)
    }
    setFilterValue = (name, value) => {
        this.context.setFilterValue(this.props.id, name, value)
    }
    render() {
        const { children, id } = this.props
        const { toggle, setFilterValue } = this

        return children({
            ...this.context.layers[id],
            toggle,
            setFilterValue,
        })
    }
}

// TODO: Remove when HOOKS appear
export class Layers extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    static contextType = LayersContext
    render() {
        return this.props.children(this.context.layers)
    }
}

// Utils
function getVisibility(key, defaultValue = false) {
    return Boolean(VISIBILITY.get(key, defaultValue))
}
