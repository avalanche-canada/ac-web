import React, { Component, Fragment } from 'react'
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
        const activeFilter = match ? ['==', 'id', id] : ['!has', 'id']
        const filter = match ? ['!=', 'id', id] : ['has', 'id']

        return (
            <Fragment>
                <Source id={key} data={data} />
                <Layer.Fill
                    id={key}
                    source={key}
                    filter={filter}
                    {...this.props}
                    {...styles.base}
                />
                <Layer.Fill
                    id={`${key}-active`}
                    source={key}
                    filter={activeFilter}
                    {...this.props}
                    {...styles.active}
                />
                <Layer.Line
                    id={`${key}-contour`}
                    source={key}
                    filter={filter}
                    {...this.props}
                    {...styles.contour}
                />
                <Layer.Line
                    id={`${key}-active-contour`}
                    source={key}
                    filter={activeFilter}
                    {...this.props}
                    {...styles.activeContour}
                />
                <Layer.Symbol
                    id={`${key}-labels`}
                    source={key}
                    {...this.props}
                    {...styles.labels}
                />
            </Fragment>
        )
    }
    render() {
        return (
            <FeatureCollection id="regions">
                {props => (
                    <Route path="map/forecasts/:id">
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
