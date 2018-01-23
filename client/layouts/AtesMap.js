import React, { PureComponent } from 'react'
import throttle from 'lodash/throttle'
import Url from 'url'
import { Map, NavigationControl } from 'components/map'
import Alert, { WARNING } from 'components/alert'
import { Generic } from 'prismic/components'
import styles from './AtesMap.css'

const CENTER = [-122, 53]

export default class AtesMap extends PureComponent {
    update = throttle(({ target }) => {
        const { offsetWidth, offsetHeight } = target.getContainer()
        const bounds = target.getBounds()
        const west = bounds.getWest()
        const south = bounds.getSouth()
        const east = bounds.getEast()
        const north = bounds.getNorth()

        if (target.getLayer('ates')) {
            target.removeLayer('ates')
            target.removeSource('ates')
        }

        target.addSource('ates', {
            type: 'image',
            url: Url.format({
                protocol: 'http',
                host: 'delivery.maps.gov.bc.ca',
                pathname: 'arcgis/rest/services/ates/ates/MapServer/export',
                query: {
                    bbox: `${west},${south},${east},${north}`,
                    bboxSR: 4326,
                    layers: 'show:1,2,3,4',
                    size: `${offsetWidth},${offsetHeight}`,
                    imageSR: 900913,
                    format: 'png32',
                    transparent: true,
                    dpi: 96,
                    f: 'image',
                },
            }),
            coordinates: [
                [west, north],
                [east, north],
                [east, south],
                [west, south],
            ],
        })

        target.addLayer({
            id: 'ates',
            type: 'raster',
            source: 'ates',
        })
    }, 500)
    render() {
        return (
            <div className={styles.Container}>
                <div className={styles.Disclaimer}>
                    <Alert type={WARNING}>
                        <Generic uid="ates-map-disclaimer" />
                    </Alert>
                </div>
                <Map
                    zoom={5}
                    center={CENTER}
                    style="default"
                    onLoad={this.update}
                    onResize={this.update}
                    onZoomend={this.update}
                    onMoveend={this.update}>
                    <NavigationControl />
                </Map>
            </div>
        )
    }
}
