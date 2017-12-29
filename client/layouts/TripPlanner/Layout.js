import React, { Component } from 'react'
import styles from './TripPlanner.css'
import Map from './Map'
import Welcome from './panels/Welcome'
import Avaluator from './panels/Avaluator'
import Forecast from './panels/Forecast'
import TerrainRating from './panels/TerrainRating'
import ForecastRating from './panels/ForecastRating'
import bbox from '@turf/bbox'
import { geometryCollection } from '@turf/helpers'

export default class TripPlannerLayout extends Component {
    state = {
        area: null,
        region: null,
        location: null,
    }
    fitBounds = geometry => {
        this.map.fitBounds(bbox(geometry), {
            padding: 25,
        })
    }
    handleLocationChange = location => this.setState({ location })
    handleForecastSelect = region => this.setState({ region })
    handleAreaSelect = area => this.setState({ area })
    handleMapLoad = event => {
        const map = event.target

        this.map = map
    }
    handleAreaLocateClick = () => {
        const { ATES_RECREATION_BNDRY_NAME } = this.state.area.properties
        const areas = this.map.querySourceFeatures('composite', {
            sourceLayer: 'ates-terrain-7cew5b',
            filter: [
                '==',
                'ATES_RECREATION_BNDRY_NAME',
                ATES_RECREATION_BNDRY_NAME,
            ],
        })
        const geometries = areas.map(area => area.geometry)

        this.fitBounds(geometryCollection(geometries))
    }
    handleLocationLocateClick = () => {
        this.map.flyTo({
            center: this.state.location,
        })
    }
    get forecast() {
        const { region } = this.state

        return region ? (
            <Forecast
                onLocateClick={this.fitBounds}
                name={region.properties.id}
            />
        ) : null
    }
    get area() {
        const { area, region, location } = this.state

        if (!area || !region) {
            return null
        }

        const { id } = region.properties
        const {
            ATES_RECREATION_BNDRY_NAME,
            ATES_ZONE_CLASS_CODE,
        } = area.properties

        return (
            <Avaluator
                location={location}
                region={id}
                name={ATES_RECREATION_BNDRY_NAME}
                terrainRating={ATES_ZONE_CLASS_CODE}
                onAreaLocateClick={this.handleAreaLocateClick}
                onLocationLocateClick={this.handleLocationLocateClick}
            />
        )
    }
    get welcome() {
        const { area, region } = this.state

        return <Welcome closable={area || region} />
    }
    render() {
        return (
            <div className={styles.Layout}>
                <Map
                    onLoad={this.handleMapLoad}
                    onForecastSelect={this.handleForecastSelect}
                    onAreaSelect={this.handleAreaSelect}
                    onLocationChange={this.handleLocationChange}
                />
                <div className={styles.Sidebar}>
                    {this.welcome}
                    {this.area}
                    {this.forecast}
                    <TerrainRating />
                    <ForecastRating />
                </div>
            </div>
        )
    }
}
