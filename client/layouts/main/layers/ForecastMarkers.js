import React, { Component } from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import { Regions } from 'containers/features'
import { Layer } from 'contexts/layers'
import { Marker } from 'components/map'
import { FORECASTS } from 'constants/drawers'

export default class ForecastMarkers extends Component {
    static propTypes = {
        map: PropTypes.object, // actually isRequired
        onMarkerClick: PropTypes.func.isRequired,
    }
    createMarker(props) {
        return <Marker {...props} map={this.props.map} />
    }
    createMarkersProps = memoize(data => data.map(createMarkerProps, this))
    withData = ({ data = [] }) => {
        const markers = this.createMarkersProps(data)

        return markers.map(this.createMarker, this)
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

    element.classList.add('map-marker')

    Object.assign(element, {
        src: dangerIconUrl,
        width: 50,
        height: 50,
        alt: name,
        title: name,
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
