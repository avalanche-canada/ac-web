import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import { Route } from 'react-router-dom'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Consumer } from 'components/map/Context'
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
    addReports = ({ data = [] }) => {
        const { filters, ...props } = this.props
        let { reports, incidents } = createFeatureCollections(data)

        if (filters.types.size > 0) {
            const filter = ({ properties }) =>
                properties.types.some(type => filters.types.has(type))

            reports = reports.filter(filter)
            incidents = incidents.filter(filter)
        }

        reports = turf.featureCollection(reports)
        incidents = turf.featureCollection(incidents)

        return (
            <Fragment>
                <Source id={key} cluster clusterMaxZoom={14} data={reports}>
                    <Layer.Symbol id={key} {...props} {...styles.reports} />
                </Source>
                <Source id={`${key}-incidents`} data={incidents}>
                    <Layer.Symbol
                        id={`${key}-incidents`}
                        {...props}
                        {...styles.incidents}
                    />
                </Source>
            </Fragment>
        )
    }
    renderActiveReport = ({ location }) => {
        const params = new URLSearchParams(location.search)

        if (params.has('panel')) {
            const [type, id] = params.get('panel').split('/')

            if (type === 'mountain-information-network-submissions') {
                const { onMouseEnter, onMouseLeave } = this.props

                return (
                    <ActiveReport
                        id={id}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                )
            }
        }

        return null
    }
    render() {
        const { days } = this.props.filters

        return (
            <Fragment>
                <Reports days={days}>{this.addReports}</Reports>
                <Route>{this.renderActiveReport}</Route>
            </Fragment>
        )
    }
}

// Utils
class ActiveReport extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    set = ({ data }) => {
        if (!data) {
            return
        }
        const { map } = this
        const { id } = this.props

        if (!map.getSource(id)) {
            map.addSource(id, {
                type: 'geojson',
                data: turf.featureCollection([createFeature(data)]),
            })
        }

        if (!map.getLayer(id)) {
            const { onMouseEnter, onMouseLeave } = this.props

            map.addLayer({
                id,
                type: 'symbol',
                source: id,
                ...styles.reports,
            })
            map.on('mouseenter', id, onMouseEnter)
            map.on('mouseleave', id, onMouseLeave)
        }
    }
    clean(id) {
        const { map } = this

        if (map.isStyleLoaded()) {
            map.removeLayer(id)
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
    validate = ({ sourceId, isSourceLoaded }) => {
        if (
            !isSourceLoaded ||
            (sourceId !== key || sourceId !== `${key}-incidents`)
        ) {
            return
        }

        const { id } = this.props
        const { length } = this.map.querySourceFeatures(sourceId, {
            filter: ['==', 'id', id],
        })

        if (length > 0) {
            this.clean(id)
        }
    }
    withMap = map => {
        this.map = map

        map.on('sourcedata', this.validate)

        return <Report id={this.props.id}>{this.set}</Report>
    }
    render() {
        return <Consumer>{this.withMap}</Consumer>
    }
}

const EMPTY = turf.featureCollection([])
function createFeature({ subid, title, lnglat, obs }) {
    const types = obs.map(pluckType)

    return turf.point(lnglat, {
        id: subid,
        icon: types.includes(INCIDENT) ? 'min-pin-with-incident' : 'min-pin',
        title,
        types,
    })
}
function pluckType({ obtype }) {
    return obtype
}
function isIncident({ properties }) {
    return properties.types.includes(INCIDENT)
}
function isNotIncident(feature) {
    return !isIncident(feature)
}
const createFeatureCollections = memoize(data => {
    const features = data.map(createFeature)

    return {
        reports: features.filter(isNotIncident),
        incidents: features.filter(isIncident),
    }
})

// Styles
const styles = {
    reports: {
        layout: {
            'icon-image': 'min-pin',
            'icon-size': 0.75,
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
