import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map, NavigationControl } from 'components/map'
import styles from './TripPlanner.css'
import bbox from '@turf/bbox'

export default class TripPlannerMap extends Component {
    static propTypes = {
        onLoad: PropTypes.func.isRequired,
        onForecastSelect: PropTypes.func.isRequired,
        onAreaSelect: PropTypes.func.isRequired,
    }
    state = {
        area: null,
        region: null,
    }
    handleLoad = event => {
        const map = event.target
        const container = map.getContainer()

        map.on('click', this.handleClick)
        for (let layer of ATES_AREAS_LAYERS) {
            map.on('mouseenter', layer, this.handleMouseenterLayer)
            map.on('mouseleave', layer, this.handleMouseleaveLayer)
        }
        for (let layer of ATES_ZONES_LAYERS) {
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
        event.target.getCanvas().style.cursor = 'pointer'
    }
    handleMouseleaveLayer = event => {
        event.target.getCanvas().style.cursor = ''
    }
    handleClick = event => {
        const { point } = event
        const [zone] = this.queryZones(point)
        const [area] = this.queryAreas(point)
        const [region] = this.queryRegions(point)

        if (area) {
            this.map.setFilter('active-ates-areas', [
                '==',
                'ATES_ZONE_ID',
                area.properties.ATES_ZONE_ID,
            ])
        }

        if (zone) {
            this.map.fitBounds(bbox(zone.geometry), {
                padding: 25,
            })
        }

        this.setState(
            {
                area,
                region,
            },
            () => {
                this.props.onAreaSelect(area)
                this.props.onForecastSelect(region)
            }
        )
    }
    render() {
        return (
            <div className={styles.Map}>
                <Map style="ates" onLoad={this.handleLoad}>
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}

// Constants
const FORECAST_LAYERS = ['forecast-regions', 'forecast-regions-contours']
const ATES_AREAS_LAYERS = ['ates-terrain']
const ATES_ZONES_LAYERS = ['ates-zones']
