import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import isSupported from '@mapbox/mapbox-gl-supported'
import {
    Map,
    Marker,
    NavigationControl,
    GeolocateControl,
    FullscreenControl,
} from 'components/map'
import styles from './GeoPosition.css'
import place from 'components/icons/place.svg'

const { LngLat } = mapbox

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
        lngLat: null,
    }
    constructor(props) {
        super(props)

        const { longitude, latitude } = props

        if (areValidCoordinates(longitude, latitude)) {
            /* eslint-disable react/no-direct-mutation-state */
            this.state.lngLat = new LngLat(longitude, latitude)
            /* eslint-disable react/no-direct-mutation-state */
        }

        this.element = document.createElement('img')

        Object.assign(this.element, {
            src: place,
        })
    }
    handleLoad = event => {
        const map = event.target

        map.on('click', this.handleClick)

        this.setState({ map })
    }
    setLngLat(lngLat, callback) {
        this.setState({ lngLat }, callback)
    }
    handleClick = ({ lngLat }) => {
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
        if (!isSupported()) {
            return null
        }

        const { lngLat } = this.state
        const { allowFullscreen } = this.props

        return (
            <div className={styles.Container}>
                <Map
                    style="default"
                    zoom={2.9}
                    center={[-125.15, 54.8]}
                    maxBounds={null} // We allow everybody to use it if they want. Interesting to see post from Japan!
                    onLoad={this.handleLoad}>
                    {lngLat && (
                        <Marker lngLat={lngLat} element={this.element} />
                    )}
                    {allowFullscreen && <FullscreenControl />}
                    <NavigationControl />
                    <GeolocateControl
                        fitBoundsOptions={{
                            maxZoom: 10,
                        }}
                    />
                </Map>
            </div>
        )
    }
}

// Utils
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
