import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bbox from '@turf/bbox'
import * as MapStateContext from 'contexts/map/state'
import { Map, NavigationControl } from 'components/map'
import styles from './TripPlanner.css'

export default class TripPlannerMap extends Component {
    static propTypes = {
        area: PropTypes.object,
        onLoad: PropTypes.func.isRequired,
        onFeaturesSelect: PropTypes.func.isRequired,
    }
    cursorEnterCounter = 0
    handleZoomEnd = event => {
        this.setZoom(event.target.getZoom())
    }
    handleMoveEnd = event => {
        this.setCenter(event.target.getCenter())
    }
    handleLoad = event => {
        const map = event.target
        const container = map.getContainer()

        map.on('click', this.handleClick)
        map.on('zoomend', this.handleZoomEnd)
        map.on('moveend', this.handleMoveEnd)

        for (let layer of [
            ...ATES_AREAS_LAYERS,
            ...ATES_ZONES_LAYERS,
            ...FORECAST_LAYERS,
        ]) {
            map.on('mouseenter', layer, this.handleMouseenterLayer)
        }

        container.addEventListener('mouseleave', this.handleMouseleave, false)

        this.map = map
        this.props.onLoad(event)
    }
    componentDidUpdate() {
        if (!this.props.area) {
            this.setActiveArea()
        }
    }
    setActiveArea(id = -1) {
        if (this.map) {
            this.map.setFilter('active-ates-areas', ['==', 'ATES_ZONE_ID', id])
        }
    }
    queryAreas(point) {
        return this.map.queryRenderedFeatures(point, {
            layers: ATES_AREAS_LAYERS,
        })
    }
    queryZones(point) {
        return this.map.queryRenderedFeatures(point, {
            layers: ATES_ZONES_LAYERS,
        })
    }
    queryRegions(point) {
        return this.map.queryRenderedFeatures(point, {
            layers: FORECAST_LAYERS,
        })
    }
    handleMouseenterLayer = event => {
        this.cursorEnterCounter = this.cursorEnterCounter + 1

        event.target.getCanvas().style.cursor = 'pointer'
    }
    handleMouseleaveLayer = event => {
        this.cursorEnterCounter = this.cursorEnterCounter - 1

        if (this.cursorEnterCounter === 0) {
            event.target.getCanvas().style.cursor = ''
        }
    }
    handleClick = event => {
        const { point } = event
        const [zone] = this.queryZones(point)
        const [area] = this.queryAreas(point)
        const [region] = this.queryRegions(point)

        this.setActiveArea(area ? area.properties.ATES_ZONE_ID : -1)

        if (zone) {
            this.map.fitBounds(bbox(zone.geometry), {
                padding: 25,
            })
        } else {
            this.props.onFeaturesSelect({ region, area })
        }
    }
    withMapState = ({ zoom, center, setZoom, setCenter }) => {
        this.setZoom = setZoom
        this.setCenter = setCenter

        return (
            <Map
                className={styles.Map}
                style="ates"
                onLoad={this.handleLoad}
                zoom={zoom}
                center={center}>
                <NavigationControl />
            </Map>
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
const FORECAST_LAYERS = ['forecast-regions', 'forecast-regions-contours']
const ATES_AREAS_LAYERS = ['ates-terrain']
const ATES_ZONES_LAYERS = ['ates-zones']
