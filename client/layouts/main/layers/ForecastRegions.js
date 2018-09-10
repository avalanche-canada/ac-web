import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import * as turf from '@turf/helpers'
import { FeatureCollection } from 'containers/mapbox'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { FORECASTS as key } from 'constants/drawers'

export default class ForecastRegions extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    renderLayers({ data = EMPTY }, { match }) {
        const id = match?.params?.id
        const activeFilter = id ? ['==', 'id', id] : ['!has', 'id']
        const filter = id ? ['!=', 'id', id] : ['has', 'id']

        return (
            <Source id={key} data={data}>
                <Layer
                    id={key}
                    type="fill"
                    filter={filter}
                    {...this.props}
                    {...styles.base}
                />
                <Layer
                    id={`${key}-active`}
                    type="fill"
                    filter={activeFilter}
                    {...this.props}
                    {...styles.active}
                />
                <Layer
                    id={`${key}-contour`}
                    type="line"
                    filter={filter}
                    {...this.props}
                    {...styles.contour}
                />
                <Layer
                    id={`${key}-active-contour`}
                    type="line"
                    filter={activeFilter}
                    {...this.props}
                    {...styles.activeContour}
                />
                <Layer
                    id={`${key}-labels`}
                    type="symbol"
                    {...this.props}
                    {...styles.labels}
                />
            </Source>
        )
    }
    render() {
        return (
            <FeatureCollection id="regions">
                {props => (
                    <Route path="/map/forecasts/:id">
                        {routeProps => this.renderLayers(props, routeProps)}
                    </Route>
                )}
            </FeatureCollection>
        )
    }
}

// Utils
const styles = {
    base: {
        paint: {
            'fill-color': '#C8D3D9',
            'fill-opacity': { base: 1, stops: [[3, 1], [8, 0]] },
        },
    },
    contour: {
        paint: {
            'line-color': '#B43A7E',
            'line-width': 1.5,
        },
    },
    active: {
        paint: {
            'fill-color': '#489BDF',
            'fill-opacity': { base: 1, stops: [[3, 1], [8, 0]] },
        },
    },
    activeContour: {
        paint: {
            'line-color': '#B43A7E',
            'line-width': 4,
        },
    },
    labels: {
        layout: {
            'text-field': '{name}',
            'text-size': 12,
        },
        paint: {
            'text-color': '#B43A7E',
            'text-halo-color': 'hsl(0, 0%, 100%)',
            'text-halo-width': 1,
        },
    },
}

const EMPTY = turf.featureCollection([])
