import React, {Component} from 'react'
import {compose, withHandlers, withProps, flattenProp, withState} from 'recompose'
import CSSModules from 'react-css-modules'
import {Map, Marker} from 'components/map'
import {Revelstoke} from 'constants/map/locations'
import styles from './GeoPosition.css'
import place from 'components/icons/place.svg'

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
        // longitude: PropTypes.number,
        // latitude: PropTypes.number,
    }
    state = {
        map: null,
        lngLat: Revelstoke,
    }
    isDragging = false
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
    handleMousemove = event => {
        if (!this.isDragging) {
            return
        }

        this.setState({
            lngLat: event.lngLat
        })
    }
    handleLoad = event => {
        this.setState({
            map: event.target
        })
    }
    handleMarkerMouseDown = event => {
        event.stopPropagation()

        this.isDragging = true
        this.cursor = 'move'
    }
    handleMouseup = event => {
        if (!this.isDragging) {
            return
        }

        const {lng, lat} = event.lngLat

        this.isDragging = false
        this.cursor = null
        this.props.onChange({
            longitude: lng,
            latitude: lat,
        })
    }
    render() {
        const {lngLat, map} = this.state

        return (
            <div styleName='Container'>
                <Map center={Revelstoke} zoom={5} onMousemove={this.handleMousemove} onMouseup={this.handleMouseup} onLoad={this.handleLoad} >
                    {map && <Marker lngLat={lngLat} element={this.element} options={MARKER_OPTIONS} />}
                </Map>
            </div>
        )
    }
}
