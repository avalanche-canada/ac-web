import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Reports } from 'containers/min'
import * as turf from '@turf/helpers'
import { MOUNTAIN_INFORMATION_NETWORK as key } from 'constants/drawers'
import { INCIDENT } from 'constants/min'
import memoize from 'lodash/memoize'

export default class WeatherStations extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        filters: PropTypes.shape({
            days: PropTypes.number,
            types: PropTypes.instanceOf(Set),
        }),
    }
    createFeatureCollections = memoize(data => {
        const features = data.map(createFeature)

        return {
            reports: features.filter(isNotIncident),
            incidents: features.filter(isIncident),
        }
    })
    add = ({ data = [] }) => {
        const { visible } = this.props
        const { types } = this.props.filters
        let { reports, incidents } = this.createFeatureCollections(data)

        if (types.size > 0) {
            const filter = ({ properties }) =>
                properties.types.some(type => types.has(type))

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
                    visible={visible}
                    {...styles.report}
                />
                <Layer.Symbol
                    id={`${key}-cluster`}
                    source={key}
                    visible={visible}
                    {...styles.cluster}
                />
                <Layer.Symbol
                    id={`${key}-incidents`}
                    source={`${key}-incidents`}
                    visible={visible}
                    {...styles.incidents}
                />
            </Fragment>
        )
    }
    render() {
        const { days } = this.props.filters

        return <Reports days={days + 180}>{this.add}</Reports>
    }
}

// Utils
function createFeature({ subid, title, lnglat, obs }) {
    const types = obs.map(pluckType)

    return turf.point(
        lnglat,
        {
            icon: types.includes(INCIDENT)
                ? 'min-pin-with-incident'
                : 'min-pin',
            title,
            types,
        },
        {
            id: subid,
        }
    )
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
