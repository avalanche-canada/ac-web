import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, Marker, Popup, NavigationControl } from 'components/map'
import { Position } from 'components/misc'
import place from 'components/icons/place.svg'
import styles from './TripPlanner.css'

export default class TripPlannerMap extends Component {
    static propTypes = {
        onLoad: PropTypes.func.isRequired,
        onForecastSelect: PropTypes.func.isRequired,
        onAreaSelect: PropTypes.func.isRequired,
        onLocationChange: PropTypes.func.isRequired,
    }
    state = {
        location: null,
        area: null,
        region: null,
    }
    constructor(props) {
        super(props)

        this.element = Object.assign(document.createElement('img'), {
            src: place,
        })
    }
    handleLoad = event => {
        const map = event.target
        const container = map.getContainer()

        map.on('click', this.handleClick)
        for (let layer of FORECAST_LAYERS) {
            map.on('mouseenter', layer, this.handleMouseenterLayer)
            map.on('mouseleave', layer, this.handleMouseleaveLayer)
        }
        for (let layer of ATES_LAYERS) {
            map.on('mouseenter', layer, this.handleMouseenterLayer)
            map.on('mouseleave', layer, this.handleMouseleaveLayer)
        }
        container.addEventListener('mouseleave', this.handleMouseleave, false)

        this.map = map
        this.props.onLoad(event)
    }
    queryAreas(point) {
        return this.map.queryRenderedFeatures(point, {
            layers: ATES_LAYERS,
        })
    }
    queryRegions(point) {
        return this.map.queryRenderedFeatures(point, {
            layers: FORECAST_LAYERS,
        })
    }
    handleMouseenterLayer = event => {
        event.target.getCanvas().style.cursor = 'pointer'
    }
    handleMouseleaveLayer = event => {
        const { point } = event
        const features = this.map.queryRenderedFeatures(point, {
            layers: [...FORECAST_LAYERS, ...ATES_LAYERS],
        })

        if (features.length === 0) {
            event.target.getCanvas().style.cursor = ''
        }
    }
    handleClick = event => {
        const { point, lngLat } = event
        const [area] = this.queryAreas(point)
        const [region] = this.queryRegions(point)

        this.setState(
            {
                area,
                location: lngLat,
                region,
            },
            () => {
                this.props.onAreaSelect(area)
                this.props.onForecastSelect(region)
                this.props.onLocationChange(lngLat)
            }
        )
    }
    get marker() {
        const { location } = this.state

        return location ? (
            <Marker lngLat={location} element={this.element} />
        ) : null
    }
    get popup() {
        const { location, area, region } = this.state

        if (!location) {
            return null
        }

        const { lng, lat } = location

        return (
            <Popup lngLat={location} options={POPUP_OPTIONS}>
                <Position longitude={lng} latitude={lat} />
                {area && [
                    <div>
                        Area: {area.properties.ATES_RECREATION_BNDRY_NAME}
                    </div>,
                    <div>
                        Terrain rating:{' '}
                        {area.properties.ATES_ZONE_CLASS_DESCRIPTION}
                    </div>,
                ]}
                {region && <div>Forecast region: {region.properties.name}</div>}
            </Popup>
        )
    }
    render() {
        return (
            <div className={styles.Map}>
                <Map style="ates" onLoad={this.handleLoad}>
                    {this.marker}
                    {this.popup}
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}

// Constants
const FORECAST_LAYERS = ['forecast-regions', 'forecast-regions-contours']
const ATES_LAYERS = ['ates-terrain']
const POPUP_OPTIONS = {
    offset: {
        top: [0, 10],
        'top-left': [10, 10],
        'top-right': [-10, 10],
        bottom: [0, -10],
        'bottom-left': [10, -10],
        'bottom-right': [-10, -10],
        left: [10, 0],
        right: [-10, 0],
    },
}
