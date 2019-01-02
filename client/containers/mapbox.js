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

// TODO Remove CACHE if not used
FeatureCollection.CACHE = new Memory()

export function FeatureCollection({ id, children }) {
    const dataset = datasets[id]

    return (
        <Fetch
            cache={FeatureCollection.CACHE}
            request={mapbox.features(dataset)}>
            {children}
        </Fetch>
    )
}

Style.propTypes = {
    id: PropTypes.oneOf(Object.keys(styleIds)),
    children: PropTypes.func.isRequired,
}

// TODO Remove CACHE if not used
Style.CACHE = new Memory()

export function Style({ id = 'default', children }) {
    const request = mapbox.style(id)

    return (
        <Fetch cache={Style.CACHE} request={request}>
            {children}
        </Fetch>
    )
}
