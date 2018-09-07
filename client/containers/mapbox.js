import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import { Memory } from 'components/fetch/Cache'
import * as mapbox from 'services/mapbox/requests'
import { datasets, styleIds } from 'services/mapbox/config.json'

export class FeatureCollection extends Component {
    static propTypes = {
        id: PropTypes.oneOf(Object.keys(datasets)).isRequired,
        children: PropTypes.func.isRequired,
    }
    static CACHE = new Memory()
    render() {
        const id = datasets[this.props.id]

        return (
            <Fetch
                cache={FeatureCollection.CACHE}
                request={mapbox.features(id)}>
                {this.props.children}
            </Fetch>
        )
    }
}

export class Style extends Component {
    static propTypes = {
        id: PropTypes.oneOf(Object.keys(styleIds)),
        children: PropTypes.func.isRequired,
    }
    static defaultProps = {
        id: 'default',
    }
    static CACHE = new Memory()
    render() {
        const request = mapbox.style(this.props.id)

        return (
            <Fetch cache={Style.CACHE} request={request}>
                {this.props.children}
            </Fetch>
        )
    }
}
