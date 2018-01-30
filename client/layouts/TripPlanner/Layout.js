import React, { PureComponent } from 'react'
import bbox from '@turf/bbox'
import { geometryCollection } from '@turf/helpers'
import { getGeom } from '@turf/invariant'
import TripPlanner from 'containers/TripPlanner'
import Map from './Map'
import TripPlanning from './TripPlanning'
import Forecast from './Forecast'
import * as utils from 'utils/region'
import styles from './TripPlanner.css'

export default class TripPlannerLayout extends PureComponent {
    handleRegionSelect = ({ properties }) => {
        this.setState({
            region: {
                id: properties.id,
                name: properties.name,
            },
        })
    }
    handleAreaSelect = ({ properties }) => {
        const name = properties.ATES_RECREATION_BNDRY_NAME

        this.setState({
            area: {
                id: properties.id,
                rating: properties.ATES_ZONE_CLASS_CODE,
                name,
                features: this.map.querySourceFeatures('composite', {
                    sourceLayer: 'ates-terrain-7cew5b',
                    filter: ['==', 'ATES_RECREATION_BNDRY_NAME', name],
                }),
            },
        })
    }
    handleElevationChange = elevation => {
        this.setState({ elevation })
    }
    handleDateChange = date => {
        this.setState({ date })
    }
    handleMapLoad = ({ target }) => {
        this.map = target
    }
    fitBounds = geometry => {
        this.map.fitBounds(bbox(geometry), {
            padding: 25,
        })
    }
    handleAreaLocateClick = () => {
        const geometries = this.state.area.features.map(getGeom)

        this.fitBounds(geometryCollection(geometries))
    }
    handleRegionLocateClick = () => {
        const region = this.regions.get(this.state.region.id)

        this.fitBounds(utils.geometry(region))
    }
    setData = ({ props }) => {
        this.regions = props.regions
        this.areas = props.areas

        return null
    }
    render() {
        return (
            <div className={styles.Layout}>
                <Map
                    onLoad={this.handleMapLoad}
                    onRegionSelect={this.handleRegionSelect}
                    onAreaSelect={this.handleAreaSelect}
                />
                <TripPlanning
                    {...this.state}
                    onElevationChange={this.handleElevationChange}
                    onDateChange={this.handleDateChange}
                    onLocateClick={this.handleAreaLocateClick}
                />
                <Forecast
                    {...this.state}
                    onElevationChange={this.handleElevationChange}
                    onDateChange={this.handleDateChange}
                    onLocateClick={this.handleRegionLocateClick}
                />
                <TripPlanner>{this.setData}</TripPlanner>
            </div>
        )
    }
}
