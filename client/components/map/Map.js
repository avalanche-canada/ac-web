import React, {
    Component,
    createRef,
    createContext,
    Children,
    cloneElement,
} from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl/dist/mapbox-gl'
import { styles, accessToken } from 'services/mapbox/config.json'
import { Canadian } from 'constants/map/bounds'
import './Map.css'

const MapContext = createContext()

mapbox.accessToken = accessToken

export default class MapComponent extends Component {
    static propTypes = {
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
        trackResize: PropTypes.bool,
        workerCount: PropTypes.number,
        onLoad: PropTypes.func,
    }
    static defaultProps = {
        maxBounds: Canadian,
        style: 'default',
        onLoad() {},
    }
    static When = class When extends Component {
        static contextType = MapContext
        render() {
            const { loaded, children } = this.props
            const { map } = this.context

            if (loaded) {
                return map && props.loaded ? children : null
            } else {
                return map ? children : null
            }
        }
    }
    static With = class With extends Component {
        static contextType = MapContext
        cloneChildren(map) {
            return Children.map(this.props.children, child =>
                cloneElement(child, { map })
            )
        }
        render() {
            const { loaded, children } = this.props
            const { map } = this.context

            if (loaded) {
                if (map && this.context.loaded) {
                    return typeof children === 'function'
                        ? children(map)
                        : this.cloneChildren(map)
                } else {
                    return null
                }
            } else {
                if (map) {
                    return typeof children === 'function'
                        ? children(map)
                        : this.cloneChildren(map)
                } else {
                    return null
                }
            }
        }
    }
    state = {
        map: undefined,
        loaded: false,
    }
    container = createRef()
    handleLoad = event => {
        this.setState({ loaded: true }, () => {
            this.props.onLoad(event)
        })
    }
    componentDidMount() {
        const { style } = this.props
        const map = new mapbox.Map({
            ...this.props,
            style: typeof style === 'string' ? styles[style] : style,
            container: this.container.current,
        })

        this.setState({ map })

        map.on('load', this.handleLoad)
    }
    componentWillUnmount() {
        const { map } = this.state

        if (map) {
            map.remove()
        }
    }
    render() {
        return (
            <MapContext.Provider value={this.state}>
                <div ref={this.container} className={this.props.className}>
                    {this.props.children}
                </div>
            </MapContext.Provider>
        )
    }
}
