import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import { Source, Layer } from 'components/map'
import { Documents } from 'prismic/containers'
import { special } from 'prismic/params'
import { SPECIAL_INFORMATION as key } from 'constants/drawers'

export default class SpecialInformation extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
    }
    add = ({ documents }) => {
        return (
            <Source id={key} data={createFeatureCollection(documents)}>
                <Layer.Symbol id={key} {...this.props} layout={layout} />
            </Source>
        )
    }
    render() {
        return <Documents {...special.reports()}>{this.add}</Documents>
    }
}

// Utils
function createFeature({ uid, data }) {
    const { headline, locations } = data

    return turf.multiPoint(
        locations.map(({ longitude, latitude }) => [longitude, latitude]),
        {
            id: uid,
            type: key,
            title: headline,
        }
    )
}
const createFeatureCollection = memoize((documents = []) =>
    turf.featureCollection(documents.map(createFeature))
)

// Styles
const layout = {
    'icon-image': 'special-information',
    'icon-allow-overlap': true,
    'icon-size': 0.65,
}
