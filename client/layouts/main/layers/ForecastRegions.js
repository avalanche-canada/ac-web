import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import * as turf from '@turf/helpers'
import { Consumer } from 'components/map/Context'
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
    renderLayers = ({ data = EMPTY }) => {
        const { props } = this
        // https://github.com/mapbox/mapbox-gl-js/issues/2716
        data.features.forEach((feature, index) => {
            feature.id = index
            feature.properties.type = key
        })

        return (
            <Source id={key} data={data}>
                <Layer.Fill id={key} {...props} {...styles.fill} />
                <Layer.Line id={`${key}-line`} {...props} {...styles.line} />
                <Layer.Symbol
                    id={`${key}-labels`}
                    {...props}
                    {...styles.labels}
                />
            </Source>
        )
    }
    render() {
        return (
            <Fragment>
                <FeatureCollection id="regions">
                    {this.renderLayers}
                </FeatureCollection>
                <Route
                    exact
                    path="/map/forecasts/:id"
                    component={ForecastRegionActivator}
                />
            </Fragment>
        )
    }
}

class ForecastRegionActivator extends PureComponent {
    static propTypes = {
        match: PropTypes.object.isRequired,
    }
    setActive(id, active) {
        const { map } = this
        const [feature] = map.querySourceFeatures(key, {
            filter: ['==', 'id', id],
        })

        if (feature) {
            map.setFeatureState({ source: key, id: feature.id }, { active })
        } else {
            map.on('sourcedata', event => {
                if (event.sourceId === key) {
                    this.setActive(id, active)
                }
            })
        }
    }
    get id() {
        return this.props.match.params.id
    }
    componentDidMount() {
        const { map } = this

        if (map.isStyleLoaded()) {
            this.setActive(this.id, true)
        } else {
            map.on('load', this.setActive.bind(this, this.id, true))
        }
    }
    componentDidUpdate({ match }) {
        this.setActive(match.params.id, false)
        this.setActive(this.id, true)
    }
    componentWillUnmount() {
        if (this.map.isStyleLoaded()) {
            this.setActive(this.id, false)
        }
    }
    withMap = map => {
        this.map = map

        return null
    }
    render() {
        return <Consumer>{this.withMap}</Consumer>
    }
}

// Constants
const EMPTY = turf.featureCollection([])

// Utils
const styles = {
    fill: {
        paint: {
            'fill-color': [
                'case',
                ['boolean', ['feature-state', 'active'], false],
                '#489BDF',
                '#C8D3D9',
            ],
            'fill-opacity': {
                base: 1,
                stops: [[3, 1], [8, 0]],
            },
        },
    },
    line: {
        paint: {
            'line-color': '#B43A7E',
            'line-width': [
                'case',
                ['boolean', ['feature-state', 'active'], false],
                4,
                1.5,
            ],
        },
    },
    labels: {
        layout: {
            'text-field': '{name}',
            'text-size': 10,
        },
        paint: {
            'text-color': '#B43A7E',
            'text-halo-color': 'hsl(0, 0%, 100%)',
            'text-halo-width': 1,
        },
    },
}
