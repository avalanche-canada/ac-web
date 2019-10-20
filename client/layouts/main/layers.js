import { useMemo, useEffect, useState } from 'react'
import * as turf from '@turf/helpers'
import {
    FORECASTS,
    WEATHER_STATION,
    MOUNTAIN_CONDITIONS_REPORTS,
    FATAL_ACCIDENT,
    HOT_ZONE_REPORTS,
    MOUNTAIN_INFORMATION_NETWORK,
} from 'constants/drawers'
import * as features from 'hooks/async/features'
import * as weather from 'hooks/async/weather'
import * as mcr from 'hooks/async/mcr'
import * as min from 'hooks/async/min'
import { useDocuments } from 'prismic/hooks'
import * as params from 'prismic/params'
import { useSource, useLayer, useMarkers } from 'hooks/mapbox'
import { INCIDENT } from 'constants/min'
import { useLayer as useLayerState } from 'contexts/layers'
import { useLocation } from 'router/hooks'

export function useForecastRegions(map) {
    const key = FORECASTS
    const IDS = [key, key + '-line', key + '-labels']
    const { visible } = useLayerState(key)
    const [regions] = features.useForecastRegions()
    const [sourceLoaded, setSourceLoaded] = useState(false)

    useEffect(() => {
        if (!map) {
            return
        }

        map.on('sourcedata', () => {
            setSourceLoaded(map.isSourceLoaded(key))
        })
    }, [map])

    useEffect(() => {
        if (!map || !sourceLoaded) {
            return
        }

        const [, type, id] = location.pathname
            .split('/')
            .filter(Boolean)
            .map(String)

        if (!id) {
            return
        }

        const [feature] = map.querySourceFeatures(key, {
            filter: ['==', 'id', id],
        })

        if (!feature) {
            return
        }

        const active = type === 'forecasts' && typeof id === 'string'
        const target = { source: key, id: feature.id }

        map.setFeatureState(target, { active })

        return () => {
            map.removeFeatureState(target, 'active')
        }
    }, [location.pathname, sourceLoaded])

    useSource(map, key, { ...GEOJSON, generateId: true }, regions)
    useLayer(
        map,
        createLayer(IDS[0], key, 'fill'),
        undefined,
        visible,
        undefined,
        EVENTS
    )
    useLayer(
        map,
        createLayer(IDS[1], key, 'line'),
        undefined,
        visible,
        undefined,
        EVENTS
    )
    useLayer(
        map,
        createLayer(IDS[2], key, 'symbol'),
        undefined,
        visible,
        undefined,
        EVENTS
    )
}

export function useForecastMarkers(map, onClick) {
    const key = FORECASTS
    const [regions] = features.useForecastRegionsMetadata()
    const { visible } = useLayerState(key)
    const definitions = useMemo(() => {
        if (!Array.isArray(regions)) {
            return
        }

        return regions.map(({ id, name, dangerIconUrl, centroid }) => {
            const element = document.createElement('img')

            element.classList.add('map-marker')

            Object.assign(element, {
                src: dangerIconUrl,
                width: 50,
                height: 50,
                alt: name,
                title: name,
                onclick(event) {
                    event.stopPropagation()

                    onClick(id)
                },
            })

            return [centroid, { element }]
        })
    }, [regions])

    const markers = useMarkers(map, definitions)

    // Make markers visible or not
    useEffect(() => {
        if (!Array.isArray(markers)) {
            return
        }

        for (const marker of markers) {
            const element = marker.getElement()

            if (visible) {
                element.removeAttribute('hidden')
            } else {
                element.setAttribute('hidden', true)
            }
        }
    }, [visible])

    return markers
}

export function useWeatherStations(map) {
    const key = WEATHER_STATION
    const { visible } = useLayerState(key)
    const [stations] = weather.useStations()
    const features = useMemo(
        () => createFeatureCollection(stations, createWeatherStationFeature),
        [stations]
    )

    useSymbolLayer(map, key, features, visible)
}

export function useMountainConditionReports(map) {
    const key = MOUNTAIN_CONDITIONS_REPORTS
    const { visible } = useLayerState(key)
    const id = useSearchPanelId('mountain-conditions-reports')
    const [reports] = mcr.useReports()
    const [report] = mcr.useReport(id)
    const features = useMemo(
        () =>
            createFeatureCollection(
                (reports || []).filter(report => report.id != id),
                createMountainConditionReportFeature
            ),
        [reports]
    )
    const single = useMemo(
        () =>
            createFeatureCollection(
                [report].filter(Boolean),
                createMountainConditionReportFeature
            ),
        [report]
    )

    useSymbolLayer(map, key, features, visible)
    useSymbolLayer(map, key + '-single', single, visible, STYLES[key].symbol)
}

export function useFatalAccidents(map) {
    const key = FATAL_ACCIDENT
    const { visible } = useLayerState(key)
    const [documents] = useDocuments(params.fatal.accidents())
    const features = useMemo(
        () => createFeatureCollection(documents, createFatalAccidentFeature),
        [documents]
    )

    useSymbolLayer(map, key, features, visible)
}

export function useAdvisories(map) {
    const key = HOT_ZONE_REPORTS
    const layer = createLayer(key, key, 'circle')
    const { visible } = useLayerState(key)
    const [areas] = features.useAdvisoriesMetadata()
    const [documents] = useDocuments(params.hotZone.reports())
    const advisories = useMemo(() => {
        if (!Array.isArray(areas) || !Array.isArray(documents)) {
            return
        }

        const regions = new Set(documents.map(pluckRegion))
        function createFeature(zone) {
            return createAdvisoryFeature(zone, regions.has(zone.id))
        }

        return createFeatureCollection(areas, createFeature)
    }, [areas, documents])

    useSource(map, key, GEOJSON, advisories)
    useLayer(map, layer, undefined, visible, undefined, EVENTS)
}

export function useMountainInformationNetwork(map) {
    let key = MOUNTAIN_INFORMATION_NETWORK
    const id = useSearchPanelId('mountain-information-network-submissions')
    const { visible, filters } = useLayerState(key)
    const { days, types } = filters
    const [data] = min.useReports(days)
    const [report] = min.useReport(id)
    const [others, incidents] = useMemo(() => {
        const features = (data || [])
            .filter(({ subid }) => subid !== id)
            .map(createMountainInformationNetworkFeature)

        return [
            turf.featureCollection(features.filter(isNotIncident)),
            turf.featureCollection(features.filter(isIncident)),
        ]
    }, [data, id])
    const filter = useMemo(
        () => createMountainInformationNetworkFilter(types),
        [types]
    )

    // Incident icons
    key = MOUNTAIN_INFORMATION_NETWORK + '-incidents'
    let style = STYLES[MOUNTAIN_INFORMATION_NETWORK].symbol
    let layer = createLayer(key, key, 'symbol', style)
    useSource(map, key, GEOJSON, incidents)
    useLayer(map, layer, undefined, visible, filter, EVENTS)

    // Other icons
    key = MOUNTAIN_INFORMATION_NETWORK
    layer = createLayer(key, key, 'symbol')
    useSource(map, key, CLUSTER, others)
    useLayer(map, layer, undefined, visible, filter, EVENTS)

    // Active report, because a report could be filtered out by the filters...
    key = MOUNTAIN_INFORMATION_NETWORK + '-active-report'
    style = STYLES[MOUNTAIN_INFORMATION_NETWORK].symbol
    const activeReport = turf.featureCollection(
        [report].filter(Boolean).map(createMountainInformationNetworkFeature)
    )
    layer = createLayer(key, key, 'symbol', style)
    useSource(map, key, GEOJSON, activeReport)
    useLayer(map, layer, undefined, true, undefined, EVENTS)
}

// Utils for MIN
function createMountainInformationNetworkFeature({
    subid,
    title,
    lnglat,
    obs,
}) {
    return turf.point(lnglat, {
        id: subid,
        type: MOUNTAIN_INFORMATION_NETWORK,
        title,
        ...obs.reduce((types, { obtype }) => {
            types[obtype] = true

            return types
        }, {}),
    })
}
function createMountainInformationNetworkFilter(types) {
    if (types.size === 0) {
        return ['boolean', true]
    }

    return [
        'any',
        ...Array.from(types, type => ['boolean', ['get', type], false]),
    ]
}
function isIncident({ properties }) {
    return INCIDENT in properties
}
function isNotIncident(feature) {
    return !isIncident(feature)
}

// Utils
const GEOJSON = {
    type: 'geojson',
}
const CLUSTER = {
    ...GEOJSON,
    cluster: true,
    clusterMaxZoom: 14,
}
const EVENTS = [
    ['mouseenter', handleMouseEnter],
    ['mouseleave', handleMouseLeave],
    ['mousemove', handleMouseMove],
]
function handleMouseMove({ target, features }) {
    // This is the best way to handle title!
    // mouseenter does not work as well
    const canvas = target.getCanvas()
    const [feature] = features
    const { name, title, point_count, cluster } = feature.properties

    canvas.title = cluster
        ? `${point_count} ${TITLES.get(feature.source)}`
        : name || title
}
let COUNTER = 0
function handleMouseEnter({ target }) {
    const canvas = target.getCanvas()

    canvas.style.cursor = 'pointer'
    COUNTER++
}
function handleMouseLeave({ target }) {
    const canvas = target.getCanvas()

    COUNTER--
    if (COUNTER < 1) {
        canvas.style.cursor = ''
    }

    canvas.title = ''
}
function createFeatureCollection(data = [], createFeature) {
    return turf.featureCollection(data.map(createFeature))
}
function useSymbolLayer(map, key, features, visible, style) {
    const layer = createLayer(key, key, 'symbol', style)

    useSource(map, key, CLUSTER, features)
    useLayer(map, layer, undefined, visible, undefined, EVENTS)
}
function createLayer(id, source, type, styles = STYLES[source][type]) {
    return { id, source, type, ...styles }
}
function createAdvisoryFeature({ id, name, centroid }, active) {
    return turf.point(
        centroid,
        {
            id,
            type: HOT_ZONE_REPORTS,
            title: name,
            active,
        },
        { id }
    )
}
function pluckRegion({ data }) {
    return data.region
}
function createWeatherStationFeature({ stationId, name, longitude, latitude }) {
    return turf.point([longitude, latitude], {
        id: stationId,
        type: WEATHER_STATION,
        title: name,
    })
}
function createMountainConditionReportFeature({ location, title, id }) {
    return turf.point(location, {
        title,
        id,
        type: MOUNTAIN_CONDITIONS_REPORTS,
    })
}
function createFatalAccidentFeature({ uid, data }) {
    const { location, title } = data

    return turf.point([location.longitude, location.latitude], {
        id: uid,
        type: FATAL_ACCIDENT,
        title,
    })
}
function useSearchPanelId(type) {
    const { location } = useLocation()

    return useMemo(() => {
        const params = new URLSearchParams(location.search)

        if (!params.has('panel')) {
            return null
        }

        const search = params
            .get('panel')
            .split('/')
            .filter(Boolean)
            .map(String)

        if (search[0] === type) {
            return search[1] || null
        }

        return null
    }, [location.search])
}

// Constants
const TITLES = new Map([
    [WEATHER_STATION, 'weather stations'],
    [MOUNTAIN_INFORMATION_NETWORK, 'Mountain Information Network reports'],
    [FATAL_ACCIDENT, 'fatal recretional accidents'],
    [HOT_ZONE_REPORTS, 'advisories'],
    [MOUNTAIN_CONDITIONS_REPORTS, 'Mountain Condition reports'],
    [FORECASTS, 'forecast'],
])

// Styles
const STYLES = {
    [FORECASTS]: {
        fill: {
            paint: {
                'fill-color': [
                    'case',
                    ['boolean', ['feature-state', 'active'], false],
                    '#489BDF',
                    '#C8D3D9',
                ],
                'fill-opacity': {
                    base: 1,
                    stops: [[3, 1], [8, 0]],
                },
            },
        },
        line: {
            paint: {
                'line-color': '#B43A7E',
                'line-width': [
                    'case',
                    ['boolean', ['feature-state', 'active'], false],
                    4,
                    1.5,
                ],
            },
        },
        symbol: {
            layout: {
                'text-field': '{name}',
                'text-size': 10,
            },
            paint: {
                'text-color': '#B43A7E',
                'text-halo-color': 'hsl(0, 0%, 100%)',
                'text-halo-width': 1,
            },
        },
    },
    [WEATHER_STATION]: {
        symbol: {
            layout: {
                'icon-image': 'weather-station',
                'icon-allow-overlap': true,
                'icon-size': 0.65,
                'text-font': ['Open Sans Extrabold'],
                'text-field': '{point_count}',
                'text-size': 10,
                'text-offset': [-0.75, 0],
            },
            paint: {
                'text-color': '#000000',
                'text-halo-color': '#FFFFFF',
                'text-halo-width': 2,
            },
        },
    },
    [MOUNTAIN_CONDITIONS_REPORTS]: {
        symbol: {
            layout: {
                'icon-image': 'mountain-conditions-report',
                'icon-allow-overlap': true,
                'icon-size': 0.75,
                'text-font': ['Open Sans Extrabold'],
                'text-field': '{point_count}',
                'text-size': 10,
                'text-offset': [-0.75, -0.9],
            },
            paint: {
                'text-color': '#1996BA',
                'text-halo-color': '#FFFFFF',
                'text-halo-width': 2,
            },
        },
    },
    [FATAL_ACCIDENT]: {
        symbol: {
            layout: {
                'icon-image': 'fatal-accident',
                'icon-allow-overlap': true,
                'icon-size': 0.75,
                'text-font': ['Open Sans Extrabold'],
                'text-field': '{point_count}',
                'text-size': 10,
                'text-offset': [-0.75, -0.8],
            },
            paint: {
                'text-color': '#000000',
                'text-halo-color': '#FFFFFF',
                'text-halo-width': 2,
            },
        },
    },
    [HOT_ZONE_REPORTS]: {
        circle: {
            paint: {
                'circle-blur': 0.75,
                'circle-opacity': 0.9,
                'circle-color': [
                    'case',
                    ['boolean', ['get', 'active'], false],
                    '#004285',
                    'hsl(0, 0%, 55%)',
                ],
                'circle-radius': {
                    base: 1,
                    stops: [[0, 0], [5, 35], [10, 250], [20, 2000]],
                },
            },
        },
    },
    [MOUNTAIN_INFORMATION_NETWORK]: {
        symbol: {
            layout: {
                'icon-image': [
                    'case',
                    ['boolean', ['get', 'incident'], false],
                    'min-pin-with-incident',
                    'min-pin',
                ],
                'icon-size': [
                    'case',
                    ['boolean', ['get', 'cluster'], false],
                    0.8,
                    0.7,
                ],
                'icon-allow-overlap': true,
                'text-field': '{point_count}',
                'text-offset': [0, -0.25],
                'text-size': 10,
            },
            paint: {
                'text-color': '#FFFFFF',
                'text-halo-color': '#FFFFFF',
                'text-halo-width': 0.25,
            },
        },
    },
}
