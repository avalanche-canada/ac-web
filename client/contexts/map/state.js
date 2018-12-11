import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { SessionStorage } from 'services/storage'

// TODO USE HOOKS

const MapStateContext = createContext()

export default MapStateContext

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    constructor(props) {
        super(props)

        this.state = {
            zoom: STORAGE.get('zoom', ZOOM),
            center: STORAGE.get('center', CENTER),
            setZoom: set.bind(this, 'zoom'),
            setCenter: set.bind(this, 'center'),
        }
    }
    render() {
        return (
            <MapStateContext.Provider value={this.state}>
                {this.props.children}
            </MapStateContext.Provider>
        )
    }
}

export const Consumer = MapStateContext.Consumer

// Constants
const STORAGE = SessionStorage.create({ keyPrefix: 'map:state' })
const CENTER = [-125.15, 54.8]
const ZOOM = 4.3

// Utils
function set(key, value) {
    this.setState({ [key]: value })

    STORAGE.set(key, value)
}
