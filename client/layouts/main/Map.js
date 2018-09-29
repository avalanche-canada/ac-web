import React, { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import * as LayersContext from 'contexts/layers'
import * as MapStateContext from 'contexts/map/state'
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
    handleZoomEnd = event => {
        this.setZoom(event.target.getZoom())
    }
    handleCenterEnd = event => {
        this.setCenter(event.target.getCenter())
    }
    handleLoad = event => {
        event.target.on('click', this.handleClick)
        event.target.on('zoomend', this.handleZoomEnd)
        event.target.on('moveend', this.handleCenterEnd)

        this.props.onLoad(event)
    }
    handleClick = ({ target, point }) => {
        const [feature] = target.queryRenderedFeatures(point, {
            layers: Array.from(LAYERS_KEYS),
        })

        if (feature) {
            this.props.onFeatureClick(feature)
        }
    }
    renderLayer([key, layer]) {
        LAYERS_KEYS.add(key)
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
    withMapState = ({ zoom, center, setZoom, setCenter }) => {
        const { onMarkerClick, onFeatureClick, ...props } = this.props

        this.setZoom = setZoom
        this.setCenter = setCenter

        return (
            <Base
                {...props}
                zoom={zoom}
                center={center}
                onLoad={this.handleLoad}
                style="2019">
                <Base.With>
                    <ForecastMarkers onMarkerClick={onMarkerClick} />
                </Base.With>
                <LayersContext.Layers>{this.renderLayers}</LayersContext.Layers>
                <NavigationControl />
            </Base>
        )
    }
    render() {
        return (
            <MapStateContext.Consumer>
                {this.withMapState}
            </MapStateContext.Consumer>
        )
    }
}

// Constants
const LAYERS_KEYS = new Set()
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
