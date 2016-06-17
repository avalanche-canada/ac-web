import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import {compose, lifecycle, withState} from 'recompose'
import {Map, Source, Layer, Popup, Utils} from './index'
import {address, company} from 'faker'
import mapboxgl from 'mapboxgl'

storiesOf('Map', module)
.add('Map w/ layers', () => {
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
            {sources.map(source => <Source key={source.id} {...source} />)}
            {layers.map(layer => <Layer key={layer.id} {...layer} />)}
        </Map>
    )
})
.add('Providers Map', () => {
    const providers = {
        type: 'FeatureCollection',
        features: Array(2000).fill(null).map(() => ({
            type: 'Feature',
            properties: {
                name: company.companyName(),
                location: address.city(),
                specialities: ['Ski', 'Youth'],
            },
            geometry: {
                type: 'Point',
                coordinates: [address.longitude(), address.latitude()]
            },
        }))
    }
    const layout = {
        "icon-image": 'marker-15',
        "icon-allow-overlap": true
    }
    const clusterLayout = {
        "text-field": '{point_count}',
        "text-font": ['Arial Unicode MS Bold'],
        "text-size": 12
    }
    const clusterEvents = {
        click: function onClusterClick(event, features) {
            const {target} = event
            const [cluster] = features

            if (!cluster) {
                return
            }

            target.flyTo({
                center: cluster.geometry.coordinates,
                zoom: target.getZoom() + 3,
            })
        }
    }
    const clusterPaint = {
        "circle-color": '#f28cb1',
        "circle-radius": 18,
    }
    const clusterFilter = ['==', 'cluster', true]
    const providersEvents = {
        click: function onProviderClick(event, features) {
            const {target} = event
            const [provider] = features

            if (!provider) {
                return
            }

            console.log('show popup for', provider)
        }
    }
    const events = {
        mousemove: Utils.cursorTogglerFactory('providers', 'providers-cluster'),
        load: function onLoad(event) {
            console.log('loaded', event.target)
        }
    }

    return (
        <Map style='light' events={events} >
            <Source id='providers' type='geojson' data={providers} cluster clusterMaxZoom={14} />
            <Layer id='providers' source='providers' type='symbol' layout={layout} events={providersEvents} />
            <Layer id='providers-cluster' source='providers' type='circle' paint={clusterPaint} events={clusterEvents} filter={clusterFilter} />
            <Layer id='providers-cluster-count' source='providers' type='symbol' layout={clusterLayout}/>
            <Popup show longitude={-118.1957} latitude={50.9981}>
                <h1>Center of the universe</h1>
            </Popup>
        </Map>
    )
})
