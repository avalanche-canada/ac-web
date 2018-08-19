import React, { Component } from 'react'
import PropTypes from 'prop-types'
import mapbox from 'mapbox-gl/mapbox-gl'
import { styles, accessToken } from 'services/mapbox/config.json'
import { Canadian } from 'constants/map/bounds'
import './Map.css'

const { LngLatBounds } = mapbox

export default class MapComponent extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        style: PropTypes.oneOfType([
            PropTypes.oneOf(Object.keys(styles)),
            PropTypes.object,
        ]).isRequired,
        containerStyle: PropTypes.object,
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
        maxBounds: PropTypes.instanceOf(LngLatBounds),
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
    }
    static childContextTypes = {
        map: PropTypes.object,
    }
    state = {
        map: null,
    }
    get map() {
        return this.state.map
    }
    setContainer = container => (this.container = container)
    getChildContext() {
        return {
            map: this.map,
        }
    }
    componentDidMount() {
        mapbox.accessToken = accessToken

        const { style, onLoad } = this.props
        const map = new mapbox.Map({
            ...this.props,
            style: styles[style],
            container: this.container,
        })

        map.once('load', () => {
            this.setState({ map })
        })

        if (typeof onLoad === 'function') {
            map.on('load', onLoad)
        }
    }
    componentWillUnmount() {
        if (this.map) {
            this.map.off()
        }
    }
    render() {
        return (
            <div ref={this.setContainer} className={this.props.className}>
                {this.map ? this.props.children : null}
            </div>
        )
    }
}
