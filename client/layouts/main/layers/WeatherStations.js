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
    createFeatureCollection = memoize(data =>
        turf.featureCollection(data.map(createFeature))
    )
    add = ({ data = [] }) => {
        return (
            <Source id={key} cluster data={this.createFeatureCollection(data)}>
                <Layer
                    id={key}
                    type="symbol"
                    {...this.props}
                    {...styles.base}
                />
                <Layer
                    id={`${key}-cluster`}
                    type="symbol"
                    {...this.props}
                    {...styles.cluster}
                />
            </Source>
        )
    }
    render() {
        return <Stations>{this.add}</Stations>
    }
}

// Utils
function createFeature({ stationId, name, longitude, latitude }) {
    return turf.point([longitude, latitude], {
        id: stationId,
        title: name,
    })
}

// Styles
const layout = {
    'icon-image': 'weather-station',
    'icon-allow-overlap': true,
    'icon-size': 0.65,
}
const styles = {
    base: {
        layout,
    },
    cluster: {
        layout: {
            ...layout,
            'text-font': ['Open Sans Extrabold'],
            'text-field': '{point_count}',
            'text-size': 12,
            'text-offset': [-0.75, 0],
        },
        paint: {
            'text-color': '#000000',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
        },
    },
}
