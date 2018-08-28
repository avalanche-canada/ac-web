import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Fetch from 'components/fetch'
import * as mapbox from 'services/mapbox/requests'
import { datasets } from 'services/mapbox/config.json'

export class FeatureCollection extends Component {
    static propTypes = {
        id: PropTypes.oneOf(Object.keys(datasets)).isRequired,
        children: PropTypes.func.isRequired,
    }
    render() {
        const id = datasets[this.props.id]

        return (
            <Fetch request={mapbox.features(id)}>{this.props.children}</Fetch>
        )
    }
}
