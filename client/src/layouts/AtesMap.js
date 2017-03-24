import React, {PureComponent} from 'react'
import CSSModules from 'react-css-modules'
import {Map, Source, Layer, NavigationControl} from 'components/map'
import Url from 'url'
import Alert, {WARNING} from 'components/alert'
import {Generic} from 'prismic/components'
import styles from './AtesMap.css'
import debounce from 'lodash/debounce'

const ZOOM = 5.1
const CENTER = [-122, 53]

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
export default class AtesMap extends PureComponent {
    state = {
        url: null,
        coordinates: null,
    }
    updateHandler = event => {
        this.update(event.target)
    }
    update = map => {
        const bounds = map.getBounds()
        const {offsetWidth, offsetHeight} = map.getContainer()
        const size = [offsetWidth, offsetHeight]

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
                <Map zoom={ZOOM} center={CENTER} style='default' onResize={this.updateHandler} onZoomend={this.updateHandler} onLoad={this.updateHandler}>
                    <NavigationControl />
                    <Source id='ATES' type='image' url={url} coordinates={coordinates} />
                    <Layer id='ATES' source='ATES' type='raster' before='place-residential' />
                </Map>
            </div>
        )
    }
}
