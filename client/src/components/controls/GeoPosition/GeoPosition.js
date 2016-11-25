import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import mapbox from 'services/mapbox/map'
import {Map, Marker} from 'components/map'
import {Revelstoke} from 'constants/map/locations'
import styles from './GeoPosition.css'
import place from 'components/icons/place.svg'
import FullscreenControl from 'services/mapbox/controls/fullscreen'

const {LngLat, NavigationControl} = mapbox
const MARKER_OPTIONS = {
    offset: [-12, -12]
}

function isValidNumber(number) {
    return typeof number === 'number' && !isNaN(number)
}

function areValidCoordinates(longitude, latitude) {
    return isValidNumber(latitude) &&
        latitude <= 90 &&
        latitude >= -90 &&
        isValidNumber(longitude)
}

function round(number) {
    return Math.round(number * 1000) / 1000
}

@CSSModules(styles)
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
        lngLat: Revelstoke,
    }
    constructor(props) {
        super(props)

        const {longitude, latitude} = props

        if (areValidCoordinates(longitude, latitude)) {
            this.state.lngLat = new LngLat(longitude, latitude)
        }
    }
    handleLoad = event => {
        const map = event.target

        if (this.props.allowFullscreen) {
            map.addControl(new FullscreenControl(), 'bottom-right')
        }

        map.addControl(new NavigationControl(), 'bottom-right')

        this.setState({map})
    }
    setLngLat(lngLat, callback) {
        this.setState({lngLat}, callback)
    }
    handleClick = ({lngLat}) => {
        this.setLngLat(lngLat, this.handleChange)
    }
    handleDragEnd = ({lngLat}) => {
        this.setLngLat(lngLat, this.handleChange)
    }
    handleChange = () => {
        const {lngLat, map} = this.state

        if (map) {
            map.easeTo({
                center: lngLat
            })
        }

        this.props.onChange({
            longitude: round(lngLat.lng),
            latitude: round(lngLat.lat),
        })
    }
    componentWillMount() {
        this.element = Object.assign(document.createElement('img'), {
            src: place,
        })
    }
    componentWillReceiveProps({longitude, latitude}) {
        if (!areValidCoordinates(longitude, latitude)) {
            return
        }

        const center = new LngLat(longitude, latitude)

        this.setLngLat(center, () => {
            const {map} = this.state
            if (map) {
                map.flyTo({
                    center,
                    speed: 1
                })
            }
        })
    }
    render() {
        const {lngLat, map} = this.state

        return (
            <div styleName='Container'>
                <Map
                    ref='map'
                    touchZoomRotate={false}
                    dragRotate={false}
                    center={lngLat}
                    zoom={5}
                    maxBounds={null}
                    onClick={this.handleClick}
                    onLoad={this.handleLoad}>
                    {map && <Marker
                        draggable
                        onDragEnd={this.handleDragEnd}
                        lngLat={lngLat}
                        element={this.element}
                        options={MARKER_OPTIONS} />}
                </Map>
            </div>
        )
    }
}
