import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Location } from '@reach/router'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import { Source, Layer } from 'components/map'
import * as Containers from 'containers/mcr'
import { MOUNTAIN_CONDITIONS_REPORTS as key } from 'constants/drawers'

export default class MountainConditionReports extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    withLocation = data => props => {
        const params = new URLSearchParams(props.location.search)

        if (params.has('panel')) {
            const [type, id] = params.get('panel').split('/')

            if (type === TYPE && data.every(r => r.id != id)) {
                return (
                    <Containers.Report id={id}>
                        {({ data }) => (
                            <Source
                                id="mountain-conditions-report"
                                data={createReportFeatureCollection(data)}>
                                <Layer.Symbol
                                    {...this.props}
                                    id="mountain-conditions-report"
                                    {...styles}
                                />
                            </Source>
                        )}
                    </Containers.Report>
                )
            }
        }

        return null
    }
    addReports = ({ data = [] }) => (
        <Fragment>
            <Source
                id={key}
                cluster
                clusterMaxZoom={14}
                data={createReportsFeatureCollection(data)}>
                <Layer.Symbol id={key} {...this.props} {...styles} />
            </Source>
            <Location>{this.withLocation(data)}</Location>
        </Fragment>
    )

    render() {
        return <Containers.Reports>{this.addReports}</Containers.Reports>
    }
}

// Utils & constants
const TYPE = 'mountain-conditions-reports'
function createFeature({ location, title, id }) {
    return turf.point(location, { title, id, type: key })
}
const createReportsFeatureCollection = memoize((data = []) =>
    turf.featureCollection(data.map(createFeature))
)
const createReportFeatureCollection = memoize(
    report => report && turf.featureCollection([createFeature(report)])
)

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
