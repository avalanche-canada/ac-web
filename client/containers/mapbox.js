import React from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as mapbox from 'services/mapbox/requests'
import { datasets, styleIds } from 'services/mapbox/config.json'

FeatureCollection.propTypes = {
    id: PropTypes.oneOf(Object.keys(datasets)).isRequired,
    children: PropTypes.func.isRequired,
}

export function FeatureCollection({ id, children }) {
    const dataset = datasets[id]

    return (
        <Fetch cache={FEATURE_COLLECTION_CACHE} url={mapbox.features(dataset)}>
            {children}
        </Fetch>
    )
}

Style.propTypes = {
    id: PropTypes.oneOf(Object.keys(styleIds)),
    children: PropTypes.func.isRequired,
}

export function Style({ id = 'default', children }) {
    return (
        <Fetch cache={STYLE_CACHE} url={mapbox.style(id)}>
            {children}
        </Fetch>
    )
}

// Caches
const FEATURE_COLLECTION_CACHE = new Memory()
const STYLE_CACHE = new Memory()
