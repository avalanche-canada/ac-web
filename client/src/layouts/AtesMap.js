import React, {PureComponent} from 'react'
import CSSModules from 'react-css-modules'
import {Map, NavigationControl} from 'components/map'
import Url from 'url'
import Alert, {WARNING} from 'components/alert'
import {Generic} from 'prismic/components'
import styles from './AtesMap.css'

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

function computeUrl(bounds, offsetWidth, offsetHeight) {
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
            size: [offsetWidth, offsetHeight].join(','),
            imageSR: 900913,
            format: 'png32',
            transparent: true,
            dpi: 96,
            f: 'image',
        }
    })
}

function createLayer(map) {
    const bounds = map.getBounds()
    const {offsetWidth, offsetHeight} = map.getContainer()

    return {
        id: 'ATES',
        type: 'raster',
        source: {
            type: 'image',
            url: computeUrl(bounds, offsetWidth, offsetHeight),
            coordinates: computeCoordinates(bounds),
        },
    }
}

function updateLayer(map) {
    const layer = createLayer(map)

    map.removeSource(layer.id)
    map.removeLayer(layer.id)
    map.addLayer(layer)
}

@CSSModules(styles)
export default class AtesMap extends PureComponent {
    state = {
        source: null,
        map: null,
    }
    handleLoad = event => {
        const map = event.target

        const update = updateLayer.bind(null, map)

        map.on('zoomend', update)
        map.on('resize', update)
        map.on('moveend', update)

        map.addLayer(createLayer(map))
    }
    render() {
        const {source} = this.state

        return (
            <div styleName='Container'>
                <div styleName='Disclaimer'>
                    <Alert type={WARNING}>
                        <Generic uid='ates-map-disclaimer' />
                    </Alert>
                </div>
                <Map zoom={ZOOM} center={CENTER} style='default' onLoad={this.handleLoad}>
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}
