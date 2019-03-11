import React from 'react'
import PropTypes from 'prop-types'
import * as turf from '@turf/helpers'
import memoize from 'lodash/memoize'
import { Source, Layer } from 'components/map'
import { Documents } from 'prismic/containers'
import { fatal } from 'prismic/params'
import { FATAL_ACCIDENT as key } from 'constants/drawers'

FatalAccidents.propTypes = {
    visible: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
}

export default function FatalAccidents(props) {
    return (
        <Documents {...fatal.accidents()}>
            {({ documents }) => (
                <Source
                    id={key}
                    cluster
                    clusterMaxZoom={14}
                    data={createFeatureCollection(documents)}>
                    <Layer.Symbol id={key} {...props} {...styles} />
                </Source>
            )}
        </Documents>
    )
}

// Utils
function createFeature({ uid, data }) {
    const { location, title } = data

    return turf.point([location.longitude, location.latitude], {
        id: uid,
        type: key,
        title,
    })
}
const createFeatureCollection = memoize((documents = []) =>
    turf.featureCollection(documents.map(createFeature))
)

// Styles
const styles = {
    layout: {
        'icon-image': 'fatal-accident',
        'icon-allow-overlap': true,
        'icon-size': 0.75,
        'text-font': ['Open Sans Extrabold'],
        'text-field': '{point_count}',
        'text-size': 10,
        'text-offset': [-0.75, -0.8],
    },
    paint: {
        'text-color': '#000000',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2,
    },
}
