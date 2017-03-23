import React, {Component} from 'react'
import CSSModules from 'react-css-modules'
import {Canadian} from 'constants/map/bounds'
import {Map, Source, Layer, NavigationControl} from 'components/map'
import Url from 'url'
import {loadImage} from 'utils/promise'
import Alert, {WARNING} from 'components/alert'
import {Generic} from 'prismic/components'
import styles from './AtesMap.css'
import throttle from 'lodash/throttle'

const zoom = 5.1
const center = [-122, 53]

function computeCoordinates(bounds) {
    const west = bounds.getWest()
    const south = bounds.getSouth()
    const east = bounds.getEast()
    const north = bounds.getNorth()

    return [
        [west, north],
        [east, north],
        [east, south],
        [west, south],
    ]
}
function computeUrl(bounds, size) {
    const west = bounds.getWest()
    const south = bounds.getSouth()
    const east = bounds.getEast()
    const north = bounds.getNorth()

    return Url.format({
        protocol: 'http',
        host: 'delivery.maps.gov.bc.ca',
        pathname: 'arcgis/rest/services/ates/ates/MapServer/export',
        query: {
            bbox: `${west},${south},${east},${north}`,
            bboxSR: 4326,
            layers: 'show:1,2,3,4',
            size: size.join(','),
            imageSR: 900913,
            format: 'png32',
            transparent: true,
            dpi: 96,
            f: 'image',
        }
    })
}

@CSSModules(styles)
export default class AtesMap extends Component {
    state = {
        url: null,
        coordinates: null,
    }
    bounds = null
    size = null
    setSize(map) {
        const {offsetWidth, offsetHeight} = map.getContainer()

        this.size = [offsetWidth, offsetHeight]

        return this
    }
    setBounds(map) {
        this.bounds = map.getBounds()

        return this
    }
    handleResize = event => {
        this.setSize(event.target).update()
    }
    handleZoomend = event => {
        this.setBounds(event.target).update()
    }
    handleMoveend = event => {
        this.setBounds(event.target).update()
    }
    handleLoad = event => {
        const map = event.target

        this.setBounds(map).setSize(map).update()
    }
    update = () => {
        const {bounds, size} = this

        if (!size || !bounds) {
            return
        }

        this.setState({
            url: computeUrl(bounds, size),
            coordinates: computeCoordinates(bounds),
        })
    }
    render() {
        const {url, coordinates} = this.state

        return (
            <div styleName='Container'>
                <div styleName='Disclaimer'>
                    <Alert type={WARNING}>
                        <Generic uid='ates-map-disclaimer' />
                    </Alert>
                </div>
                <Map zoom={zoom} center={center} style='default' onResize={this.handleResize} onZoomend={this.handleZoomend} onMoveend={this.handleMoveend} onLoad={this.handleLoad}>
                    <NavigationControl />
                    <Source id='ATES' type='image' url={url} coordinates={coordinates} />
                    <Layer id='ATES' source='ATES' type='raster' before='place-residential' />
                </Map>
            </div>
        )
    }
}
