import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Basic as Map, NavigationControl } from 'components/map'
import bbox from '@turf/bbox'
import styles from './TripPlanner.css'

export default class TripPlannerMap extends Component {
    static propTypes = {
        onLoad: PropTypes.func.isRequired,
        onRegionSelect: PropTypes.func.isRequired,
        onAreaSelect: PropTypes.func.isRequired,
    }
    state = {
        area: null,
        region: null,
    }
    cursorEnterCounter = 0
    handleLoad = event => {
        const map = event.target
        const container = map.getContainer()

        map.on('click', this.handleClick)

        for (let layer of [
            ...ATES_AREAS_LAYERS,
            ...ATES_ZONES_LAYERS,
            ...FORECAST_LAYERS,
        ]) {
            map.on('mouseenter', layer, this.handleMouseenterLayer)
            map.on('mouseleave', layer, this.handleMouseleaveLayer)
        }

        container.addEventListener('mouseleave', this.handleMouseleave, false)

        this.map = map
        this.props.onLoad(event)
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

        this.map.setFilter('active-ates-areas', [
            '==',
            'ATES_ZONE_ID',
            area ? area.properties.ATES_ZONE_ID : -1,
        ])

        if (zone) {
            this.map.fitBounds(bbox(zone.geometry), {
                padding: 25,
            })
        } else {
            this.setState(
                {
                    area: area || null,
                    region: region || null,
                },
                () => {
                    if (area) {
                        this.props.onAreaSelect(area)
                    }
                    if (region) {
                        this.props.onRegionSelect(region)
                    }
                }
            )
        }
    }
    render() {
        return (
            <Map
                className={styles.Map}
                style="ates"
                onLoad={this.handleLoad}
                zoom={10}
                center={CENTER}>
                <NavigationControl />
            </Map>
        )
    }
}

// Constants
const FORECAST_LAYERS = ['forecast-regions', 'forecast-regions-contours']
const ATES_AREAS_LAYERS = ['ates-terrain']
const ATES_ZONES_LAYERS = ['ates-zones']
const CENTER = [-118.3, 51.17]
