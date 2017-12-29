import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, Marker, NavigationControl } from 'components/map'
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
    render() {
        return (
            <div className={styles.Map}>
                <Map style="ates" onLoad={this.handleLoad}>
                    {this.marker}
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}

// Constants
const FORECAST_LAYERS = ['forecast-regions', 'forecast-regions-contours']
const ATES_LAYERS = ['ates-terrain']
