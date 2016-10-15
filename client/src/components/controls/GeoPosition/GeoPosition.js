import React, {Component} from 'react'
import {compose, withHandlers, withProps, flattenProp, withState} from 'recompose'
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

function createElement(onMouseDown) {
    const element = document.createElement('img')

    element.classList.add(styles.Marker)
    element.addEventListener('mousedown', onMouseDown, false)

    Object.assign(element, {
        src: place,
    })

    return element
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
    constructor(props, ...args) {
        super(props, ...args)

        const {longitude, latitude} = props

        if (typeof longitude === 'number' &&
            typeof latitude === 'number' &&
            !isNaN(longitude) &&
            !isNaN(latitude)) {
            this.state.lngLat = new LngLat(longitude, latitude)
        }
    }
    isDragging = false
    isMoving = false
    set cursor(cursor = null) {
        const {map} = this.state

        if (map) {
            const canvas = map.getCanvas()

            canvas.style.cursor = cursor
        }
    }
    componentWillMount() {
        this.element = createElement(this.handleMarkerMouseDown)
    }
    handleMousemove = ({lngLat}) => {
        if (!this.isDragging) {
            return
        }

        this.setState({lngLat})
    }
    handleLoad = event => {
        this.setState({
            map: event.target
        })
    }
    handleClick = ({lngLat}) => {
        this.setState({lngLat}, this.handleChange)
    }
    handleMarkerMouseDown = event => {
        event.stopPropagation()

        this.isDragging = true
        this.cursor = 'move'
    }
    handleMouseup = ({lngLat}) => {
        if (!this.isDragging) {
            return
        }

        this.setState({lngLat}, () => {
            this.isDragging = false
            this.cursor = null
            this.handleChange()
        })
    }
    handleMovestart = () => {
        this.isMoving = true
    }
    handleMoveend = () => {
        this.isMoving = false
    }
    handleChange = () => {
        const {lngLat, map} = this.state

        if (map) {
            map.easeTo({
                center: lngLat
            })
        }

        this.props.onChange({
            longitude: lngLat.lng,
            latitude: lngLat.lat,
        })
    }
    componentWillReceiveProps({longitude, latitude}) {
        if (typeof longitude !== 'number' ||
            typeof latitude !== 'number' ||
            isNaN(longitude) ||
            isNaN(latitude)) {
            return
        }

        const lngLat = new LngLat(longitude, latitude)
        const {map} = this.state

        this.setState({lngLat}, () => {
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
                <Map center={lngLat} zoom={5} onClick={this.handleClick} onLoad={this.handleLoad} onMovestart={this.handleMovestart} onMoveend={this.handleMoveend} >
                    {map && <Marker lngLat={lngLat} element={this.element} options={MARKER_OPTIONS} />}
                </Map>
            </div>
        )
    }
}
