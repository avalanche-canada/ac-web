import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import * as LAYERS from 'constants/drawers'
import { LocalStorage } from 'services/storage'

const LAYERS_VISIBILITY = LocalStorage.create({
    keyPrefix: 'layers-visibility',
})
const LAYERS_FILTERS = LocalStorage.create({
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
        [LAYERS.SPECIAL_INFORMATION]: {
            visible: true,
        },
        [LAYERS.MOUNTAIN_INFORMATION_NETWORK]: {
            visible: true,
            filters: {
                days: Number(
                    LAYERS_FILTERS.get(
                        `${LAYERS.MOUNTAIN_INFORMATION_NETWORK}-days`,
                        7
                    )
                ),
                types: new Set(),
            },
        },
        [LAYERS.WEATHER_STATION]: {
            visible: Boolean(
                LAYERS_VISIBILITY.get(LAYERS.WEATHER_STATION, true)
            ),
        },
        [LAYERS.FATAL_ACCIDENT]: {
            visible: Boolean(
                LAYERS_VISIBILITY.get(LAYERS.FATAL_ACCIDENT, false)
            ),
        },
        [LAYERS.TOYOTA_TRUCK_REPORTS]: {
            visible: Boolean(
                LAYERS_VISIBILITY.get(LAYERS.TOYOTA_TRUCK_REPORTS, true)
            ),
        },
        [LAYERS.MOUNTAIN_CONDITIONS_REPORTS]: {
            visible: Boolean(
                LAYERS_VISIBILITY.get(LAYERS.MOUNTAIN_CONDITIONS_REPORTS, true)
            ),
        },
    }
    get value() {
        return {
            layers: this.state,
            toggle: this.toggle,
        }
    }
    toggle = id => {
        this.setState(state => ({
            [id]: {
                ...state[id],
                visible: !state[id].visible,
            },
        }))
    }
    render() {
        return (
            <Context.Provider value={this.value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export class Layer extends Component {
    static propTypes = {
        id: PropTypes.oneOf(LAYERS.default).isRequired,
        children: PropTypes.func.isRequired,
    }
    children = ({ toggle, layers }) => {
        const { children, id } = this.props

        return children({
            ...layers[id],
            toggle() {
                toggle(id)
            },
        })
    }

    render() {
        return <Consumer>{this.children}</Consumer>
    }
}

export class Layers extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    children = ({ layers }) => this.props.children(layers)
    render() {
        return <Consumer>{this.children}</Consumer>
    }
}

const Context = createContext(LAYERS)
const { Consumer } = Context
