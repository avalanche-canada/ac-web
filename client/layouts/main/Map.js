import React, { Component, Fragment, createElement } from 'react'
import PropTypes from 'prop-types'
import * as context from 'contexts/layers'
import { Basic, Marker, NavigationControl } from 'components/map'
import LAYERS from './layers'

export default class Layout extends Component {
    propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    }
    renderLayer([key, layer]) {
        return createElement(LAYERS.get(key), { ...layer, key })
    }
    renderLayers = layers => {
        return Object.entries(layers).map(this.renderLayer)
    }
    render() {
        return (
            <Basic style="2016">
                <context.Layers>{this.renderLayers}</context.Layers>
                <NavigationControl />
            </Basic>
        )
    }
}
