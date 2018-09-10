import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Reports } from 'containers/mcr'
import { MOUNTAIN_CONDITIONS_REPORTS as key } from 'constants/drawers'

export default class MountainConditionReports extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    createFeatureCollection = memoize(data =>
        turf.featureCollection(data.map(createFeature))
    )
    add = ({ data = [] }) => {
        return (
            <Source id={key} cluster data={this.createFeatureCollection(data)}>
                <Layer
                    id={key}
                    type="symbol"
                    {...this.props}
                    {...styles.report}
                />
                <Layer
                    id={`${key}-cluster`}
                    type="symbol"
                    {...this.props}
                    {...styles.cluster}
                />
            </Source>
        )
    }
    render() {
        return <Reports>{this.add}</Reports>
    }
}

// Utils
function createFeature({ location, title, id }) {
    return turf.point(location, { title, id, type: key })
}

// Styles
const styles = {
    report: {
        filter: ['!has', 'point_count'],
        layout: {
            'icon-image': 'mountain-conditions-report',
            'icon-size': 0.75,
            'icon-allow-overlap': true,
        },
    },
    cluster: {
        filter: ['has', 'point_count'],
        layout: {
            'icon-image': 'mountain-conditions-report',
            'icon-allow-overlap': true,
            'icon-size': 0.9,
            'text-font': ['Open Sans Extrabold'],
            'text-field': '{point_count}',
            'text-size': 12,
            'text-offset': [-0.75, -0.9],
        },
        paint: {
            'text-color': '#1996BA',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
        },
    },
}
