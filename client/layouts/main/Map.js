import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import * as context from 'contexts/layers'
import ForecastMarkers from './layers/ForecastMarkers'
import { Map as Base, NavigationControl } from 'components/map'
import * as TYPES from 'constants/drawers'
import LAYERS from './layers'

export default class Layout extends Component {
    propTypes = {
        onFeatureClick: PropTypes.func.isRequired,
        onMarkerClick: PropTypes.func.isRequired,
        onError: PropTypes.func,
        onLoad: PropTypes.func,
    }
    cursorEnterCounter = 0
    handleMouseEnterLayer = ({ target, features }) => {
        const [feature] = features
        const { name, title, point_count, cluster } = feature.properties
        const canvas = target.getCanvas()

        this.cursorEnterCounter = this.cursorEnterCounter + 1

        canvas.style.cursor = 'pointer'
        canvas.title = cluster
            ? `${point_count} ${TITLES.get(feature.source)}`
            : name || title
    }
    handleMouseLeaveLayer = ({ target }) => {
        this.cursorEnterCounter = this.cursorEnterCounter - 1

        if (this.cursorEnterCounter === 0) {
            const canvas = target.getCanvas()

            canvas.style.cursor = ''
            canvas.title = ''
        }
    }
    handleLoad = event => {
        event.target.on('click', this.handleClick)

        this.props.onLoad(event)
    }
    handleClick = ({ target, point }) => {
        const [feature] = target.queryRenderedFeatures(point)

        if (feature) {
            this.props.onFeatureClick(feature)
        }
    }
    renderLayer([key, layer]) {
        return createElement(LAYERS.get(key), {
            ...layer,
            key,
            onMouseEnter: this.handleMouseEnterLayer,
            onMouseLeave: this.handleMouseLeaveLayer,
        })
    }
    renderLayers = layers => {
        return Object.entries(layers).map(this.renderLayer, this)
    }
    render() {
        return (
            <Base {...this.props} onLoad={this.handleLoad} style="2019">
                <ForecastMarkers onMarkerClick={this.props.onMarkerClick} />
                <context.Layers>{this.renderLayers}</context.Layers>
                <NavigationControl />
            </Base>
        )
    }
}

// Constants
const TITLES = new Map([
    [TYPES.WEATHER_STATION, 'weather stations'],
    [TYPES.TOYOTA_TRUCK_REPORTS, 'Toyota Truck Report'],
    [
        TYPES.MOUNTAIN_INFORMATION_NETWORK,
        'Mountain Information Network reports',
    ],
    [TYPES.FATAL_ACCIDENT, 'fatal recretional accidents'],
    [TYPES.SPECIAL_INFORMATION, 'special information'],
    [TYPES.HOT_ZONE_REPORTS, 'hot zones'],
    [TYPES.MOUNTAIN_CONDITIONS_REPORTS, 'Mountain Condition reports'],
    [TYPES.FORECASTS, 'forecast'],
])
