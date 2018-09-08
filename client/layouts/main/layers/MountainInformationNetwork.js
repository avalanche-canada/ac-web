import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import { Route } from 'react-router-dom'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Report, Reports } from 'containers/min'
import * as turf from '@turf/helpers'
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
    createFeatureCollections = memoize(data => {
        const features = data.map(createFeature)

        return {
            reports: features.filter(isNotIncident),
            incidents: features.filter(isIncident),
        }
    })
    addActiveReport = ({ data }) => {
        if (!data) {
            return null
        }

        const { onMouseEnter, onMouseLeave } = this.props
        const source = `${key}-report`

        return (
            <Fragment>
                <Source
                    id={source}
                    data={turf.featureCollection([createFeature(data)])}
                />
                <Layer.Symbol
                    id={source}
                    source={source}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    {...styles.report}
                />
            </Fragment>
        )
    }
    addReports = ({ data = [] }) => {
        const { filters, ...props } = this.props
        let { reports, incidents } = this.createFeatureCollections(data)

        if (filters.types.size > 0) {
            const filter = ({ properties }) =>
                properties.types.some(type => filters.types.has(type))

            reports = reports.filter(filter)
            incidents = incidents.filter(filter)
        }

        return (
            <Fragment>
                <Source
                    id={key}
                    cluster
                    clusterMaxZoom={14}
                    data={turf.featureCollection(reports)}
                />
                <Source
                    id={`${key}-incidents`}
                    data={turf.featureCollection(incidents)}
                />
                <Layer.Symbol
                    id={key}
                    source={key}
                    {...props}
                    {...styles.report}
                />
                <Layer.Symbol
                    id={`${key}-cluster`}
                    source={key}
                    {...props}
                    {...styles.cluster}
                />
                <Layer.Symbol
                    id={`${key}-incidents`}
                    source={`${key}-incidents`}
                    {...props}
                    {...styles.incidents}
                />
            </Fragment>
        )
    }
    renderReport = ({ location }) => {
        const params = new URLSearchParams(location.search)

        if (!params.has('panel')) {
            return null
        }

        const [type, id] = params.get('panel').split('/')

        if (type !== 'mountain-information-network-submissions') {
            return null
        }

        return <Report id={id}>{this.addActiveReport}</Report>
    }
    render() {
        const { days } = this.props.filters

        return (
            <Fragment>
                <Reports days={days}>{this.addReports}</Reports>
                <Route>{this.renderReport}</Route>
            </Fragment>
        )
    }
}

// Utils
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

// Styles
const styles = {
    report: {
        filter: ['!has', 'point_count'],
        layout: {
            'icon-image': '{icon}',
            'icon-allow-overlap': true,
            'icon-size': 0.75,
        },
    },
    cluster: {
        filter: ['has', 'point_count'],
        layout: {
            'icon-image': 'min-pin',
            'icon-allow-overlap': true,
            'text-field': '{point_count}',
            'text-offset': [0, -0.25],
            'text-size': 12,
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
