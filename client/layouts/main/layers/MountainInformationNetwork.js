import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import { Route } from 'react-router-dom'
import { Source, Layer, Map } from 'components/map'
import { Report, Reports } from 'containers/min'
import { MOUNTAIN_INFORMATION_NETWORK as key } from 'constants/drawers'
import { INCIDENT } from 'constants/min'

export default class MountainInformationNetwork extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        filters: PropTypes.shape({
            days: PropTypes.number,
            types: PropTypes.instanceOf(Set),
        }),
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    get filter() {
        const { types } = this.props.filters

        return types.size === 0
            ? ['boolean', true]
            : [
                  'any',
                  ...Array.from(types).map(type => [
                      'boolean',
                      ['get', type],
                      false,
                  ]),
              ]
    }
    addReports = ({ data = [] }) => {
        const { filter } = this
        const { filters, ...props } = this.props
        const collections = createFeatureCollections(data)

        return (
            <Fragment>
                <Map.With loaded>
                    <Source
                        id={key}
                        cluster
                        clusterMaxZoom={14}
                        data={collections.reports}>
                        <Layer.Symbol
                            id={key}
                            filter={filter}
                            {...props}
                            {...styles.reports}
                        />
                    </Source>
                    <Source
                        id={`${key}-incidents`}
                        data={collections.incidents}>
                        <Layer.Symbol
                            id={`${key}-incidents`}
                            filter={filter}
                            {...props}
                            {...styles.incidents}
                        />
                    </Source>
                </Map.With>
                <Map.With loaded>{this.createWithMap(collections)}</Map.With>
            </Fragment>
        )
    }
    createWithMap = ({ all }) => map => {
        return (
            <Route>
                {({ location }) => {
                    const params = new URLSearchParams(location.search)

                    if (params.has('panel')) {
                        const [type, id] = params.get('panel').split('/')
                        const hasReport = report => report.properties.id !== id
                        const { onMouseEnter, onMouseLeave } = this.props

                        if (type === TYPE && all.every(hasReport)) {
                            return (
                                <ActiveReport
                                    id={id}
                                    map={map}
                                    onMouseEnter={onMouseEnter}
                                    onMouseLeave={onMouseLeave}
                                />
                            )
                        }
                    }

                    return null
                }}
            </Route>
        )
    }
    render() {
        const { days } = this.props.filters

        return <Reports days={days}>{this.addReports}</Reports>
    }
}

// Utils
class ActiveReport extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        map: PropTypes.object, // actually isRequired
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    withReport = ({ data }) => {
        const { id, map } = this.props
        const report = turf.featureCollection(data ? [createFeature(data)] : [])
        const { onMouseEnter, onMouseLeave } = this.props

        return (
            <Source id={id} map={map} data={report}>
                <Layer.Symbol
                    id={id}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    {...styles.reports}
                />
            </Source>
        )
    }
    clean(id) {
        const { map } = this.props

        if (!map.getStyle()) {
            return
        }

        if (map.getLayer(id)) {
            map.removeLayer(id)
        }
        if (map.getSource(id)) {
            map.removeSource(id)
        }
    }
    componentDidUpdate({ id }) {
        if (this.props.id !== id) {
            this.clean(id)
        }
    }
    componentWillUnmount() {
        this.clean(this.props.id)
    }
    render() {
        return <Report id={this.props.id}>{this.withReport}</Report>
    }
}
const TYPE = 'mountain-information-network-submissions'
function isIncident({ properties }) {
    return INCIDENT in properties
}
function isNotIncident(feature) {
    return !isIncident(feature)
}
function createFeature({ subid, title, lnglat, obs }) {
    return turf.point(lnglat, {
        id: subid,
        type: key,
        title,
        ...obs.reduce((types, { obtype }) => {
            types[obtype] = true

            return types
        }, {}),
    })
}
const createFeatureCollections = memoize(data => {
    const features = data.map(createFeature)

    return {
        reports: turf.featureCollection(features.filter(isNotIncident)),
        incidents: turf.featureCollection(features.filter(isIncident)),
        all: features,
    }
})

// Styles
const styles = {
    reports: {
        layout: {
            'icon-image': [
                'case',
                ['boolean', ['get', 'incident'], false],
                'min-pin-with-incident',
                'min-pin',
            ],
            'icon-size': [
                'case',
                ['boolean', ['get', 'cluster'], false],
                0.8,
                0.7,
            ],
            'icon-allow-overlap': true,
            'text-field': '{point_count}',
            'text-offset': [0, -0.25],
            'text-size': 10,
        },
        paint: {
            'text-color': '#FFFFFF',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 0.25,
        },
    },
    incidents: {
        layout: {
            'icon-image': 'min-pin-with-incident',
            'icon-allow-overlap': true,
            'icon-size': 0.75,
        },
    },
}
