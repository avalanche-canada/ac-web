import React, { useReducer, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import { styles, accessToken } from 'services/mapbox/config.json'
import MapContext, { WithMap } from './context'
import { createAction } from 'utils/reducer'
import './Map.css'

mapbox.accessToken = accessToken

MapComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.oneOfType([
        PropTypes.oneOf(Object.keys(styles)),
        PropTypes.object,
    ]),
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    bearing: PropTypes.number,
    pitch: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    interactive: PropTypes.bool,
    bearingSnap: PropTypes.number,
    classes: PropTypes.arrayOf(PropTypes.string),
    attributionControl: PropTypes.bool,
    failIfMajorPerformanceCaveat: PropTypes.bool,
    preserveDrawingBuffer: PropTypes.bool,
    maxBounds: PropTypes.instanceOf(mapbox.LngLatBounds),
    scrollZoom: PropTypes.bool,
    boxZoom: PropTypes.bool,
    dragRotate: PropTypes.bool,
    dragPan: PropTypes.bool,
    keyboard: PropTypes.bool,
    doubleClickZoom: PropTypes.bool,
    touchZoomRotate: PropTypes.bool,
    pitchWithRotate: PropTypes.bool,
    trackResize: PropTypes.bool,
    workerCount: PropTypes.number,
    onLoad: PropTypes.func,
}
MapComponent.With = WithMap

MapComponent.defaultProps = {
    pitchWithRotate: false,
}

export default function MapComponent({
    className,
    style = 'default',
    onLoad = () => {},
    children,
    ...props
}) {
    const container = useRef()
    const [state, dispatch] = useReducer(reducer, {
        map: undefined,
        loaded: false,
    })

    useEffect(() => {
        Object.assign(props, {
            style: typeof style === 'string' ? styles[style] : style,
            container: container.current,
        })

        const map = new mapbox.Map(props)

        map.on('load', event => {
            dispatch(loaded())
            onLoad(event)
        })

        dispatch(created(map))

        return () => {
            if (state.map) {
                state.map.remove()
            }
        }
    }, [])

    return (
        <MapContext.Provider value={state}>
            <div ref={container} className={className}>
                {children}
            </div>
        </MapContext.Provider>
    )
}

// Reducer, state and actions
const created = createAction('CREATED')
const loaded = createAction('LOADED')
function reducer(state, action) {
    switch (action.type) {
        case 'CREATED':
            return {
                ...state,
                map: action.payload,
            }
        case 'LOADED':
            return {
                ...state,
                loaded: true,
            }
        default:
            return state
    }
}
