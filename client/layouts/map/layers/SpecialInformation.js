import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import Source from 'components/map/sources/GeoJSON'
import Layer from 'components/map/Layer'
import { Documents } from 'prismic/containers'
import { special } from 'prismic/params'
import { SPECIAL_INFORMATION as key } from 'constants/drawers'

export default class SpecialInformation extends Component {
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
                    data={this.createFeatureCollection(documents)}
                />
                <Layer.Symbol
                    id={key}
                    source={key}
                    visible={visible}
                    layout={layout}
                />
            </Fragment>
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
            title: headline,
        },
        {
            id: uid,
        }
    )
}

// Styles
const layout = {
    'icon-image': 'special-information',
    'icon-allow-overlap': true,
    'icon-size': 0.65,
}
