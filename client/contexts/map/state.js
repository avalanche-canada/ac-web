import React, { createContext, Component } from 'react'
import PropTypes from 'prop-types'
import { SessionStorage } from 'services/storage'

const Context = createContext()

export class Provider extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    }
    storage = SessionStorage.create({ keyPrefix: 'map:state' })
    state = {
        zoom: this.storage.get('zoom', 4.3),
        center: this.storage.get('center', [-125.15, 54.8]),
    }
    setZoom = zoom => {
        this.setState({ zoom })
        this.storage.set('zoom', zoom)
    }
    setCenter = center => {
        this.setState({ center })
        this.storage.set('center', center)
    }
    get value() {
        return {
            ...this.state,
            setZoom: this.setZoom,
            setCenter: this.setCenter,
        }
    }
    render() {
        return (
            <Context.Provider value={this.value}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
