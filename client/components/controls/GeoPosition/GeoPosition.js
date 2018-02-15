import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import mapbox from 'services/mapbox/map'
import {
    Map,
    Marker,
    NavigationControl,
    FullscreenControl,
} from 'components/map'
import { Revelstoke } from 'constants/map/locations'
import styles from './GeoPosition.css'
import place from 'components/icons/place.svg'

const { LngLat } = mapbox
const MARKER_OPTIONS = {
    offset: [-12, -12],
}

function isValidNumber(number) {
    return typeof number === 'number' && !isNaN(number)
}

function areValidCoordinates(longitude, latitude) {
    return (
        isValidNumber(latitude) &&
        latitude <= 90 &&
        latitude >= -90 &&
        isValidNumber(longitude)
    )
}

function round(number) {
    return Math.round(number * 100000) / 100000
}

export default class GeoPosition extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        longitude: PropTypes.number,
        latitude: PropTypes.number,
        allowFullscreen: PropTypes.bool,
    }
    static defaultProps = {
        allowFullscreen: true,
    }
    state = {
        map: null,
        lngLat: new LngLat(Revelstoke.longitude, Revelstoke.latitude),
    }
    constructor(props) {
        super(props)

        const { longitude, latitude } = props

        if (areValidCoordinates(longitude, latitude)) {
            /* eslint-disable react/no-direct-mutation-state */
            this.state.lngLat = new LngLat(longitude, latitude)
            /* eslint-disable react/no-direct-mutation-state */
        }
    }
    handleLoad = event => {
        this.setState({
            map: event.target,
        })
    }
    setLngLat(lngLat, callback) {
        this.setState({ lngLat }, callback)
    }
    handleClick = ({ lngLat }) => {
        this.setLngLat(lngLat, this.handleChange)
    }
    handleDragEnd = ({ lngLat }) => {
        this.setLngLat(lngLat, this.handleChange)
    }
    handleChange = () => {
        const { lngLat, map } = this.state
        const { lng, lat } = lngLat.wrap()

        if (map) {
            map.easeTo({
                center: lngLat,
            })
        }

        this.props.onChange({
            longitude: round(lng),
            latitude: round(lat),
        })
    }
    componentWillMount() {
        this.element = Object.assign(document.createElement('img'), {
            src: place,
        })
    }
    componentWillReceiveProps({ longitude, latitude }) {
        if (!areValidCoordinates(longitude, latitude)) {
            return
        }

        const center = new LngLat(longitude, latitude)

        this.setLngLat(center, () => {
            const { map } = this.state
            if (map) {
                map.flyTo({
                    center,
                    speed: 1,
                })
            }
        })
    }
    render() {
        const { lngLat } = this.state
        const { allowFullscreen } = this.props

        return (
            <div className={styles.Container}>
                <Map
                    ref="map"
                    style="default"
                    touchZoomRotate={false}
                    dragRotate={false}
                    center={lngLat}
                    zoom={5}
                    maxBounds={null}
                    onClick={this.handleClick}
                    onLoad={this.handleLoad}>
                    <Marker
                        draggable
                        onDragEnd={this.handleDragEnd}
                        lngLat={lngLat}
                        element={this.element}
                        options={MARKER_OPTIONS}
                    />
                    {allowFullscreen && <FullscreenControl />}
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}
