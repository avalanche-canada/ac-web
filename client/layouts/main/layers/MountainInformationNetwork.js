import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import { Location } from '@reach/router'
import { Source, Layer } from 'components/map'
import { Report, Reports } from 'containers/min'
import { MOUNTAIN_INFORMATION_NETWORK as key } from 'constants/drawers'
import { INCIDENT } from 'constants/min'

MountainInformationNetwork.propTypes = {
    visible: PropTypes.bool,
    filters: PropTypes.shape({
        days: PropTypes.number,
        types: PropTypes.instanceOf(Set),
    }),
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export default function MountainInformationNetwork({ filters, ...props }) {
    const { days, types } = filters
    const filter = useMemo(
        () =>
            types.size === 0
                ? ['boolean', true]
                : [
                      'any',
                      ...Array.from(types).map(type => [
                          'boolean',
                          ['get', type],
                          false,
                      ]),
                  ],
        [types]
    )
    const withLocation = all => ({ location }) => {
        const params = new URLSearchParams(location.search)

        if (!params.has('panel')) {
            return null
        }

        const [type, id] = params
            .get('panel')
            .split('/')
            .filter(Boolean)

        if (
            type !== TYPE ||
            typeof id !== 'string' ||
            all.some(({ properties }) => properties.id === id)
        ) {
            return null
        }

        return (
            <Report id={id}>
                {({ data }) => (
                    <Source id={id} data={createReportFeatureCollection(data)}>
                        <Layer.Symbol id={id} {...props} {...styles.reports} />
                    </Source>
                )}
            </Report>
        )
    }

    return (
        <Reports days={days}>
            {({ data = [] }) => {
                const { reports, incidents, all } = createFeatureCollections(
                    data
                )

                return (
                    <Fragment>
                        <Source
                            id={key}
                            cluster
                            clusterMaxZoom={14}
                            data={reports}>
                            <Layer.Symbol
                                id={key}
                                filter={filter}
                                {...props}
                                {...styles.reports}
                            />
                        </Source>
                        <Source id={`${key}-incidents`} data={incidents}>
                            <Layer.Symbol
                                id={`${key}-incidents`}
                                filter={filter}
                                {...props}
                                {...styles.incidents}
                            />
                        </Source>
                        <Location>{withLocation(all)}</Location>
                    </Fragment>
                )
            }}
        </Reports>
    )
}

// Utils
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
const createReportFeatureCollection = memoize(report =>
    turf.featureCollection(report ? [createFeature(report)] : [])
)

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
