import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import mapbox from 'services/mapbox/map'
import {Map, Marker} from 'components/map'
import {Revelstoke} from 'constants/map/locations'
import styles from './GeoPosition.css'
import place from 'components/icons/place.svg'

const {LngLat} = mapbox
const MARKER_OPTIONS = {
    offset: [-12, -12]
}

function isValid(number) {
    return typeof number === 'number' && !isNaN(number)
}

function areValid(...numbers) {
    return numbers.every(isValid)
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
    }
    state = {
        map: null,
        lngLat: Revelstoke,
    }
    constructor(props) {
        super(props)

        const {longitude, latitude} = props

        if (areValid(longitude, latitude)) {
            this.state.lngLat = new LngLat(longitude, latitude)
        }
    }
    isMoving = false
    handleLoad = event => {
        this.setState({
            map: event.target
        })
    }
    handleClick = ({lngLat}) => {
        this.setState({lngLat}, this.handleChange)
    }
    handleMovestart = () => {
        this.isMoving = true
    }
    handleMoveend = () => {
        this.isMoving = false
    }
    handleDragEnd = lngLat => {
        this.setState({lngLat}, this.handleChange)
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
            className: styles.Marker,
        })
    }
    componentWillReceiveProps({longitude, latitude}) {
        if (!areValid(longitude, latitude)) {
            return
        }

        const lngLat = new LngLat(longitude, latitude)

        this.setState({lngLat}, () => {
            const {map} = this.state
            if (!this.isMoving && map) {
                map.flyTo({
                    center: lngLat,
                    speed: 1
                })
            }
        })
    }
    render() {
        const {lngLat, map} = this.state

        return (
            <div styleName='Container'>
                <Map center={lngLat} zoom={5}
                    onClick={this.handleClick}
                    onLoad={this.handleLoad}
                    onMovestart={this.handleMovestart}
                    onMoveend={this.handleMoveend} >
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
