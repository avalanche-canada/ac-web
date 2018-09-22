import React, { Component, PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Match } from '@reach/router'
import * as turf from '@turf/helpers'
import { FeatureCollection } from 'containers/mapbox'
import { Source, Layer, Map } from 'components/map'
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
            feature.id = index + 1
            feature.properties.type = key
        })

        return (
            <Map.With loaded>
                <Source id={key} data={data}>
                    <Layer.Fill id={key} {...props} {...styles.fill} />
                    <Layer.Line
                        id={`${key}-line`}
                        {...props}
                        {...styles.line}
                    />
                    <Layer.Symbol
                        id={`${key}-labels`}
                        {...props}
                        {...styles.labels}
                    />
                </Source>
            </Map.With>
        )
    }
    renderForecastRegionActivator({ match }) {
        return match ? (
            <Map.With loaded>
                <ForecastRegionActivator id={match.id} />
            </Map.With>
        ) : null
    }
    render() {
        return (
            <Fragment>
                <FeatureCollection id="regions">
                    {this.renderLayers}
                </FeatureCollection>
                <Match path="forecasts/:id">
                    {this.renderForecastRegionActivator}
                </Match>
            </Fragment>
        )
    }
}

class ForecastRegionActivator extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        map: PropTypes.object.isRequired,
    }
    setActive(id, active) {
        const { map } = this.props
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
        return this.props.id
    }
    componentDidMount() {
        this.setActive(this.id, true)
    }
    componentDidUpdate({ id }) {
        this.setActive(id, false)
        this.setActive(this.id, true)
    }
    componentWillUnmount() {
        if (this.props.map.isStyleLoaded()) {
            this.setActive(this.id, false)
        }
    }
    render() {
        return null
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
