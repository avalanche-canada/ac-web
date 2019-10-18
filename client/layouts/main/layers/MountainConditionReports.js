import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import * as turf from '@turf/helpers'
import { Source, Symbol } from 'components/map'
import { useReports, useReport } from 'hooks/async/mcr'
import { MOUNTAIN_CONDITIONS_REPORTS as key } from 'constants/drawers'

MountainConditionReports.propTypes = {
    visible: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export default function MountainConditionReports(props) {
    const [reports = []] = useReports()
    const data = useMemo(
        () => turf.featureCollection(reports.map(createFeature)),
        [reports]
    )

    return (
        <Fragment>
            <Source id={key} cluster clusterMaxZoom={14} data={data}>
                <Symbol id={key} {...props} {...styles} />
            </Source>
            <Location>
                {({ location }) => {
                    const params = new URLSearchParams(location.search)

                    if (!params.has('panel')) {
                        return null
                    }

                    const [type, id] = params.get('panel').split('/')

                    if (type !== TYPE || reports.some(r => r.id == id)) {
                        return null
                    }

                    return <Report id={id} props={props} />
                }}
            </Location>
        </Fragment>
    )
}

// Utils & constants
const TYPE = 'mountain-conditions-reports'
function Report({ id, props }) {
    const [report] = useReport(id)
    const data = useMemo(() => {
        return report && turf.featureCollection([createFeature(report)])
    }, [report])

    return (
        <Source id="mountain-conditions-report" data={data}>
            <Symbol {...props} id="mountain-conditions-report" {...styles} />
        </Source>
    )
}
function createFeature({ location, title, id }) {
    return turf.point(location, { title, id, type: key })
}

// Styles
const styles = {
    layout: {
        'icon-image': 'mountain-conditions-report',
        'icon-allow-overlap': true,
        'icon-size': 0.75,
        'text-font': ['Open Sans Extrabold'],
        'text-field': '{point_count}',
        'text-size': 10,
        'text-offset': [-0.75, -0.9],
    },
    paint: {
        'text-color': '#1996BA',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2,
    },
}
