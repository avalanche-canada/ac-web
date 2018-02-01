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
    state = {
        left: true,
        right: false,
    }
    handleFeaturesSelect = next => {
        function updater(state) {
            const area = this.createAreaState(next, state)
            const region = this.createRegionState(next, state)

            return {
                area,
                left: Boolean(area),
                region,
                right: Boolean(region),
            }
        }

        this.setState(updater)
    }
    createAreaState(next, previous) {
        if (
            (next.area && next.region) ||
            (next.area &&
                previous.region &&
                previous.region.id === next.region.properties.id)
        ) {
            const {
                id,
                ATES_ZONE_CLASS_CODE,
                ATES_RECREATION_BNDRY_NAME,
            } = next.area.properties

            return {
                id,
                rating: ATES_ZONE_CLASS_CODE,
                name: ATES_RECREATION_BNDRY_NAME,
                features: this.map.querySourceFeatures('composite', {
                    sourceLayer: 'ates-terrain-7cew5b',
                    filter: [
                        '==',
                        'ATES_RECREATION_BNDRY_NAME',
                        ATES_RECREATION_BNDRY_NAME,
                    ],
                }),
            }
        }

        return null
    }
    createRegionState(next) {
        const { id, name } = next.region.properties

        return { id, name }
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
    handleLeftCloseClick = () => this.setState({ left: false, area: null })
    handleRightCloseClick = () => this.setState({ right: false })
    render() {
        const { left, right, ...state } = this.state

        return (
            <div className={styles.Layout}>
                <Map
                    {...state}
                    onLoad={this.handleMapLoad}
                    onFeaturesSelect={this.handleFeaturesSelect}
                />
                <TripPlanning
                    {...state}
                    open={left}
                    onCloseClick={this.handleLeftCloseClick}
                    onElevationChange={this.handleElevationChange}
                    onDateChange={this.handleDateChange}
                    onLocateClick={this.handleAreaLocateClick}
                />
                <Forecast
                    {...state}
                    open={right}
                    onCloseClick={this.handleRightCloseClick}
                    onElevationChange={this.handleElevationChange}
                    onDateChange={this.handleDateChange}
                    onLocateClick={this.handleRegionLocateClick}
                />
                <TripPlanner>{this.setData}</TripPlanner>
            </div>
        )
    }
}
