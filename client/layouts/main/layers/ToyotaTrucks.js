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
    createFeatureCollection = memoize(documents =>
        turf.featureCollection(documents.map(createFeature))
    )
    add = ({ documents = [] }) => {
        const data = this.createFeatureCollection(documents)

        return (
            <Source id={key} cluster data={data}>
                <Layer id={key} type="symbol" {...style} {...this.props} />
            </Source>
        )
    }
    render() {
        return <Documents {...toyota.trucks()}>{this.add}</Documents>
    }
}

// Utils
function createFeature({ uid, data }) {
    const { position, headline } = data

    return turf.point([position.longitude, position.latitude], {
        title: headline,
        id: uid,
    })
}

// Styles
const style = {
    layout: {
        'icon-image': 'toyota-truck',
        'icon-size': 0.2,
        'icon-allow-overlap': true,
    },
}
