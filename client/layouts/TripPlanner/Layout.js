import React, { Component } from 'react'
import styles from './TripPlanner.css'
import Map from './Map'
import Welcome from './panels/Welcome'
import Avaluator from './panels/Avaluator'
import Forecast from './panels/Forecast'
import bbox from '@turf/bbox'

export default class TripPlannerLayout extends Component {
    state = {
        area: null,
        region: null,
    }
    fitBounds = geometry => {
        this.map.fitBounds(bbox(geometry), {
            padding: 25,
        })
    }
    handleForecastSelect = region => this.setState({ region })
    handleAreaSelect = area => this.setState({ area })
    handleMapLoad = event => {
        const map = event.target

        this.map = map
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
        const { area, region } = this.state

        if (!area || !region) {
            return null
        }

        const { id } = region.properties
        const {
            ATES_RECREATION_BNDRY_NAME,
            ATES_ZONE_CLASS_DESCRIPTION,
        } = area.properties

        return (
            <Avaluator
                region={id}
                name={ATES_RECREATION_BNDRY_NAME}
                terrainRating={ATES_ZONE_CLASS_DESCRIPTION}
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
                />
                <div className={styles.Sidebar}>
                    {this.welcome}
                    {this.area}
                    {this.forecast}
                </div>
            </div>
        )
    }
}
