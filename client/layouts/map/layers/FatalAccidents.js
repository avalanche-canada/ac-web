import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Documents } from 'prismic/containers'
import { fatal } from 'prismic/params'
import { FATAL_ACCIDENT as key } from 'constants/drawers'

export default class FatalAccidents extends Component {
    static propTypes = {
        visible: PropTypes.bool,
    }
    createFeatureCollection = memoize(documents =>
        turf.featureCollection(documents.map(createFeature))
    )
    add = ({ documents = [] }) => {
        const { visible } = this.props

        return (
            <Fragment>
                <Source
                    id={key}
                    cluster
                    data={this.createFeatureCollection(documents)}
                />
                <Layer.Symbol
                    id={key}
                    source={key}
                    visible={visible}
                    {...styles.single}
                />
                <Layer.Symbol
                    id={`${key}-cluster`}
                    source={key}
                    visible={visible}
                    {...styles.cluster}
                />
            </Fragment>
        )
    }
    render() {
        return <Documents {...fatal.accidents()}>{this.add}</Documents>
    }
}

// Utils
function createFeature({ uid, data }) {
    const { location, title } = data

    return turf.point(
        [location.longitude, location.latitude],
        {
            title,
        },
        {
            id: uid,
        }
    )
}

// Styles
const styles = {
    single: {
        // filter: ['!has', 'point_count'],
        layout: {
            'icon-image': 'fatal-accident',
            'icon-allow-overlap': true,
            'icon-size': 0.75,
        },
    },
    cluster: {
        filter: ['has', 'point_count'],
        layout: {
            'icon-image': 'fatal-accident',
            'icon-allow-overlap': true,
            'icon-size': 0.9,
            'text-font': ['Open Sans Extrabold'],
            'text-field': '{point_count}',
            'text-size': 12,
            'text-offset': [-0.7, -0.8],
        },
        paint: {
            'text-color': '#000000',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
        },
    },
}
