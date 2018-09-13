import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Documents } from 'prismic/containers'
import { toyota } from 'prismic/params'
import { TOYOTA_TRUCK_REPORTS as key } from 'constants/drawers'

export default class ToyotaTrucks extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    withDocuments = ({ documents }) => {
        return (
            <Source
                id={key}
                cluster
                clusterMaxZoom={14}
                data={createFeatureCollection(documents)}>
                <Layer.Symbol id={key} {...styles} {...this.props} />
            </Source>
        )
    }
    render() {
        return <Documents {...toyota.trucks()}>{this.withDocuments}</Documents>
    }
}

// Utils
function createFeature({ uid, data }) {
    const { position, headline } = data

    return turf.point([position.longitude, position.latitude], {
        title: headline,
        type: key,
        id: uid,
    })
}
const createFeatureCollection = memoize((documents = []) =>
    turf.featureCollection(documents.map(createFeature))
)

// Styles
const styles = {
    layout: {
        'icon-image': 'toyota-truck',
        'icon-allow-overlap': true,
        'icon-size': 0.2,
        'text-font': ['Open Sans Extrabold'],
        'text-field': '{point_count}',
        'text-size': 10,
        'text-offset': [-0.8, -0.6],
    },
    paint: {
        'text-color': '#B9421A',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2,
    },
}
