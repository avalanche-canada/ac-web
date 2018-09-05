import React, { Component } from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import { Regions } from 'containers/features'
import { Layer } from 'contexts/layers'
import { Marker } from 'components/map'
import { FORECASTS } from 'constants/drawers'

export default class ForecastMarkers extends Component {
    static propTypes = {
        onMarkerClick: PropTypes.func.isRequired,
    }
    createMarker(props) {
        return <Marker {...props} />
    }
    createMarkersProps = memoize(data => data.map(createMarkerProps, this))
    withData = ({ data = [] }) => {
        const markers = this.createMarkersProps(data)

        return markers.map(this.createMarker)
    }
    withContext = ({ visible }) =>
        visible ? <Regions>{this.withData}</Regions> : null
    render() {
        return <Layer id={FORECASTS}>{this.withContext}</Layer>
    }
}

// Utils
function createMarkerProps({ id, name, dangerIconUrl, centroid }) {
    const { onMarkerClick } = this.props
    const element = document.createElement('img')

    Object.assign(element, {
        src: dangerIconUrl,
        width: 50,
        height: 50,
        alt: name,
        title: name,
        style: {
            cursor: 'pointer',
        },
    })

    return {
        id,
        key: id,
        lngLat: centroid,
        element,
        onClick() {
            onMarkerClick(id)
        },
    }
}
