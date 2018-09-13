import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Stations } from 'containers/weather'
import { WEATHER_STATION as key } from 'constants/drawers'

export default class WeatherStations extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    withData = ({ data }) => {
        return (
            <Source
                id={key}
                cluster
                clusterMaxZoom={14}
                data={createFeatureCollection(data)}>
                <Layer.Symbol id={key} {...this.props} {...styles} />
            </Source>
        )
    }
    render() {
        return <Stations>{this.withData}</Stations>
    }
}

// Utils
function createFeature({ stationId, name, longitude, latitude }) {
    return turf.point([longitude, latitude], {
        id: stationId,
        type: key,
        title: name,
    })
}
const createFeatureCollection = memoize((data = []) =>
    turf.featureCollection(data.map(createFeature))
)

// Styles
const styles = {
    layout: {
        'icon-image': 'weather-station',
        'icon-allow-overlap': true,
        'icon-size': 0.65,
        'text-font': ['Open Sans Extrabold'],
        'text-field': '{point_count}',
        'text-size': 10,
        'text-offset': [-0.75, 0],
    },
    paint: {
        'text-color': '#000000',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2,
    },
}
