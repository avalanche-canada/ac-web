import React, { Component } from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import { Regions } from 'containers/features'
import { Layer } from 'contexts/layers'
import { Marker } from 'components/map'
import { FORECASTS } from 'constants/drawers'

const ICONS = new Map([
    ['Jasper National Park', createRatings()],
    ['South Columbia', createRatings()],
    ['Purcells', createRatings()],
    ['Lizard Range and Flathead', createRatings()],
    ['Cariboos', createRatings()],
    ['South Coast Inland', createRatings()],
    ['Northwest Coastal', createRatings()],
    ['Northwest Inland', createRatings()],
    ['North Columbia', createRatings()],
    ['Sea To Sky', createRatings()],
    ['Kootenay Boundary', createRatings()],
    ['Glacier National Park', createRatings()],
    ['South Rockies', createRatings()],
    ['Little Yoho', createRatings()],
    ['South Coast', createRatings()],
    ['Waterton Lakes National Park', createRatings()],
    ['Banff Yoho & Kootenay National Park', createRatings()],
    ['Kananaskis Country, Alberta Parks', createRatings()],
])

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

    const src = ICONS.has(name)
        ? `/api/forecasts/graphics/${ICONS.get(name).join(
              '/'
          )}/danger-rating-icon.svg`
        : dangerIconUrl

    Object.assign(element, {
        src,
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
function getRandomRating(min = 1, max = 5) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}
function createRatings() {
    return [getRandomRating(3, 5), getRandomRating(2, 4), getRandomRating(1, 3)]
}
