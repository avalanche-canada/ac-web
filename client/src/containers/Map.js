import React from 'react'
import {Map, Source, Layer, Popup, Utils} from 'components/map'

export default function MapContainer({ children }) {
    const sources = [{
        id: 'data',
        type: 'geojson',
        data: 'http://www.avalanche.ca/api/forecasts'
    }]
    const layers = [{
            id: 'forecasts',
            source: 'data',
            type: 'fill',
            filter: ['in', 'type', 'avalx', 'parks', 'link'],
            paint: {
                "fill-color": "#3bb2d0",
                "fill-outline-color": "#FF00FF",
                "fill-opacity": 0.5
            },
            events: {
                click: (...args) => console.log('Forecast clicked', ...args),
            }
        }, {
            id: 'hzr',
            source: 'data',
            type: 'fill',
            filter: ['==', 'type', 'hotzone'],
            paint: {
                "fill-color": "#ffffff",
                "fill-outline-color": "#FF00FF",
                "fill-opacity": 0.5
            },
            events: {
                click: (...args) => console.log('hzr clicked', ...args),
            }
        }, {
            id: 'forecast-labels',
            source: 'data',
            type: 'symbol',
            filter: ['in', 'type', 'avalx', 'parks', 'link'],
            layout: {
                "text-field": "{name}",
                "text-ignore-placement": true
            }
        }, {
            id: 'forecast-icons',
            source: 'data',
            type: 'symbol',
            filter: ['in', 'type', 'avalx', 'parks', 'link'],
            layout: {
                // "icon-image": "http://www.avalanche.ca{dangerIconUrl}"
                "icon-image": 'harbor'
            },
        }
    ]
    const events = {
        moveend: function onMoveend({target}) {
            console.log(target.getCenter().toArray())
        },
        zoomend: function onZoomend({target}) {
            console.log(target.getZoom())
        },
    }

    return (
        <Map events={events}>
            {/*{sources.map(source => <Source key={source.id} {...source} />)}*/}
            {/*{layers.map(layer => <Layer key={layer.id} {...layer} />)}*/}
        </Map>
    )
}
