import React, { PureComponent } from 'react'
import throttle from 'lodash/throttle'
import Url from 'url'
import { Map, NavigationControl, Source, Layer } from 'components/map'
import Alert, { WARNING } from 'components/alert'
import { Generic } from 'prismic/components'
import { Status } from 'components/misc'
import styles from './AtesMap.css'

const CENTER = [-122, 53]

export default class AtesMap extends PureComponent {
    state = {
        isLoading: false,
        coordinates: null,
        url: null,
    }
    constructor(props) {
        super(props)

        this.layer = <Layer id="ates" type="raster" />
    }
    updateSource = throttle(({ target }) => {
        const { offsetWidth, offsetHeight } = target.getContainer()
        const bounds = target.getBounds()
        const west = bounds.getWest()
        const south = bounds.getSouth()
        const east = bounds.getEast()
        const north = bounds.getNorth()

        this.setState({
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
    }, 500)
    updateIsLoading = event => {
        if (event.sourceId === 'ates') {
            this.setState({
                isLoading: !event.isSourceLoaded,
            })
        }
    }
    get source() {
        const { coordinates, url } = this.state

        if (!coordinates || !url) {
            return null
        }

        return (
            <Source id="ates" type="image" coordinates={coordinates} url={url}>
                {this.layer}
            </Source>
        )
    }
    render() {
        return (
            <div className={styles.Container}>
                <Status isLoading={this.state.isLoading} />
                <div className={styles.Disclaimer}>
                    <Alert type={WARNING}>
                        <Generic uid="ates-map-disclaimer" />
                    </Alert>
                </div>
                <Map
                    zoom={5}
                    center={CENTER}
                    style="default"
                    onLoad={this.updateSource}
                    onSourcedata={this.updateIsLoading}
                    onResize={this.updateSource}
                    onZoomend={this.updateSource}
                    onMoveend={this.updateSource}>
                    <NavigationControl />
                    {this.source}
                </Map>
            </div>
        )
    }
}
