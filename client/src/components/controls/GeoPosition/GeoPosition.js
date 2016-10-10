import React from 'react'
import {compose, withHandlers, withProps, flattenProp, withState} from 'recompose'
import CSSModules from 'react-css-modules'
import {Map, Marker} from 'components/map'
import {Revelstoke} from 'constants/map/locations'
import styles from './GeoPosition.css'
import place from 'components/icons/place.svg'

GeoPosition.propTypes = {
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    placeholders: PropTypes.shape({
        longitude: PropTypes.string,
        latitude: PropTypes.string,
    }),
}

function GeoPosition({longitude, latitude, onInputChange, placeholders = {}, element, lnglat, onMousemove, onLoad}) {
    return (
        <div styleName='Container'>
            <div styleName='Controls'>
                <input type='number' value={longitude} placeholder={placeholders.longitude} name='longitude' onChange={onInputChange} />
                <input type='number' value={latitude} placeholder={placeholders.latitude} name='latitude' onChange={onInputChange} />
            </div>
            <Map center={Revelstoke} onMousemove={onMousemove} onLoad={onLoad} >
                <Marker lnglat={lnglat} element={element} />
            </Map>
        </div>
    )
}

function createElement(onMouseDown, onMouseUp) {
    const element = document.createElement('img')

    element.classList.add(styles.Marker)
    element.addEventListener('mousedown', onMouseDown, false)
    element.addEventListener('mouseup', onMouseUp, false)

    Object.assign(element, {
        src: place,
    })

    return element
}

function setCursor(cursor = null) {
    if (this) {
        const canvas = this.getCanvas()

        canvas.style.cursor = cursor
    }
}

export default compose(
    withState('isDragging', 'setIsDragging', false),
    withState('lnglat', 'setLngLat', Revelstoke),
    withState('map', 'setMap', null),
    withHandlers({
        onInputChange: props => event => {
            const {value, name} = event.target
            const {longitude, latitude} = props
            const coordinates = {
                longitude,
                latitude,
                [name]: value,
            }

            props.setLngLat([coordinates.longitude, coordinates.latitude])
            props.onChange(coordinates)
        },
        onMousemove: props => event => {
            if (!props.isDragging) {
                return
            }

            props.setLngLat(event.lngLat)
        },
        onMarkerMouseDown: props => event => {
            event.stopPropagation()
            props.setIsDragging(true)
            setCursor.call(props.map, 'move')
        },
        onMarkerMouseUp: props => event => {
            const {lnglat: {lng, lat}} = props

            props.setIsDragging(false)
            setCursor.call(props.map)

            props.onChange({
                longitude: lng,
                latitude: lat,
            })
        },
        onLoad: props => event => {
            props.setMap(event.target)
        },
    }),
    withProps(({onMarkerMouseDown, onMarkerMouseUp}) => ({
        element: createElement(onMarkerMouseDown, onMarkerMouseUp)
    })),
    CSSModules(styles),
)(GeoPosition)
