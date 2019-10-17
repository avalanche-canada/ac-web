import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import { Location } from '@reach/router'
import { Source, Symbol } from 'components/map'
import { MOUNTAIN_INFORMATION_NETWORK as key } from 'constants/drawers'
import { INCIDENT } from 'constants/min'
import { useReports, useReport } from 'hooks/min'

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
    const [data = []] = useReports(days)
    const { reports, incidents, all } = useMemo(() => {
        const features = data.map(createFeature)

        return {
            reports: turf.featureCollection(features.filter(isNotIncident)),
            incidents: turf.featureCollection(features.filter(isIncident)),
            all: features,
        }
    }, [data])
    const filter = useMemo(() => createFilter(types), [types])
    function withLocation({ location }) {
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

        return <Report id={id} {...props} />
    }

    return (
        <Fragment>
            <Source id={key} cluster clusterMaxZoom={14} data={reports}>
                <Symbol
                    id={key}
                    filter={filter}
                    {...props}
                    {...styles.reports}
                />
            </Source>
            <Source id={`${key}-incidents`} data={incidents}>
                <Symbol
                    id={`${key}-incidents`}
                    filter={filter}
                    {...props}
                    {...styles.incidents}
                />
            </Source>
            <Location>{withLocation}</Location>
        </Fragment>
    )
}

// Utils
function Report({ id, ...props }) {
    const [report] = useReport(id)
    const data = useMemo(
        () => turf.featureCollection(report ? [createFeature(report)] : []),
        [report]
    )

    return report ? (
        <Source id={id} data={data}>
            <Symbol id={id} {...props} {...styles.reports} />
        </Source>
    ) : null
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

// Styles
function createFilter(types) {
    if (types.size === 0) {
        return ['boolean', true]
    }

    return [
        'any',
        ...Array.from(types, type => ['boolean', ['get', type], false]),
    ]
}
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
