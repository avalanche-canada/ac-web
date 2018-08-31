import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as context from 'contexts/layers'
import { Basic as Map, Marker, NavigationControl } from 'components/map'
import LAYERS from './layers'

export default class Layout extends Component {
    propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    }
    renderLayer([key, layer]) {
        return createElement(LAYERS.get(key), layer)
    }
    renderLayers({ layers }) {
        return (
            <Fragment>{Object.entries(layers).map(this.renderLayer)}</Fragment>
        )
    }
    render() {
        return (
            <Map style="2016">
                <context.Layers>{this.renderLayers}</context.Layers>
                <NavigationControl />
            </Map>
        )
    }
}
