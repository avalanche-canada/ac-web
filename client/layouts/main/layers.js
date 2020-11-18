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
import { useAreas } from 'hooks/async/api/areas'
import { useMetadata } from 'hooks/async/api/metadata'
import * as weather from 'hooks/async/weather'
import * as mcr from 'hooks/async/mcr'
import * as min from 'hooks/async/min'
import * as prismic from 'prismic/hooks'
import * as params from 'prismic/params'
import * as mapbox from 'hooks/mapbox'
import { useMapState, ERRORS } from 'contexts/map/state'
import { INCIDENT } from 'constants/min'
import { useLayer as useLayerState } from 'contexts/layers'
import { useLocation } from 'router/hooks'
import { usePrimaryDrawer, useSecondaryDrawer } from './drawers/hooks'
import { useMerge } from 'hooks/async'
import { captureException } from 'services/sentry'
import { createPath } from 'utils/product'
import * as products from 'constants/products'

export function useForecastRegions(map) {
    const key = FORECASTS
    const IDS = [key, key + '-line', key + '-labels']
    const { visible } = useLayerState(key)
    const [[areas, metadata], , errors] = useMerge(useAreas(), useMetadata())
    const [sourceLoaded, setSourceLoaded] = useState(false)
    const { type, id } = usePrimaryDrawer()
    const features = useMemo(() => {
        if (!Array.isArray(areas?.features) || !Array.isArray(metadata)) {
            return EMPTY_FEATURE_COLLECTION
        }

        const features = areas.features
            // REMOVE THAT AFTER API RETURNS JUST AREA THAT HAVE A PRODUCT
            .filter(area =>
                metadata.some(metadata => metadata.area.id === area.id)
            )
            // REMOVE THAT AFTER API RETURNS JUST AREA THAT HAVE A PRODUCT
            .map(area => {
                const { product, owner, url } = metadata.find(
                    metadata => metadata.area.id === area.id
                )
                const pathname = createPath(products.FORECAST, product.slug)
                const extra = owner.isExternal ? { url } : { pathname }

                return {
                    ...area,
                    properties: {
                        ...area.properties,
                        ...extra,
                    },
                }
            })

        return turf.featureCollection(features)
    }, [areas, metadata])

    useMapErrors(ERRORS.FORECAST, ...errors)

    useEffect(() => {
        if (!map) {
            return
        }

        map.on('sourcedata', () => {
            setSourceLoaded(map.isSourceLoaded(key))
        })
    }, [map])

    useEffect(() => {
        if (!map || !sourceLoaded || !id || type !== 'forecasts') {
            return
        }

        const [feature] = map.querySourceFeatures(key, {
            filter: ['==', 'id', id],
        })

        if (!feature) {
            return
        }

        const target = { source: key, id: feature.id }

        map.setFeatureState(target, { active: true })

        return () => {
            map.removeFeatureState(target, 'active')
        }
    }, [map, type, id, sourceLoaded])

    mapbox.useSource(map, key, GEOJSON, features)
    mapbox.useLayer(
        map,
        createLayer(IDS[0], key, 'fill'),
        undefined,
        visible,
        undefined,
        EVENTS
    )
    mapbox.useLayer(
        map,
        createLayer(IDS[1], key, 'line'),
        undefined,
        visible,
        undefined,
        EVENTS
    )
    mapbox.useLayer(
        map,
        createLayer(IDS[2], key, 'symbol'),
        undefined,
        visible,
        undefined,
        EVENTS
    )
}

export function useForecastMarkers(map) {
    const key = FORECASTS
    const [metadata, , error] = useMetadata()
    const { visible } = useLayerState(key)
    const { navigate } = useLocation()
    const markers = useMemo(() => {
        if (!Array.isArray(metadata)) {
            return EMPTY_ARRAY
        }

        return metadata.map(({ product, centroid, icons, url, owner }) => {
            const { slug, title } = product
            const element = document.createElement('img')

            element.style.cursor = 'pointer'

            Object.assign(element, {
                src: icons.find(findIcon).graphic,
                width: 50,
                height: 50,
                alt: title,
                title,
                onclick(event) {
                    event.stopPropagation()

                    if (owner.isExternal) {
                        window.open(url, title)
                    } else {
                        const pathname = createPath(products.FORECAST, slug)
                        const url = pathname + window.location.search

                        navigate(url)
                    }
                },
            })

            return [centroid, { element }]
        })
    }, [metadata])

    useMapErrors(ERRORS.FORECAST, error)

    // Make markers visible or not
    useEffect(() => {
        if (!Array.isArray(markers)) {
            return
        }

        for (const marker of markers) {
            const { element } = marker[1]

            if (visible) {
                element.removeAttribute('hidden')
            } else {
                element.setAttribute('hidden', true)
            }
        }
    }, [visible])

    return mapbox.useMarkers(map, markers)
}

export function useWeatherStations(map) {
    const key = WEATHER_STATION
    const { visible } = useLayerState(key)
    const [stations, , error] = weather.useStations()
    const features = useMemo(
        () => createFeatureCollection(stations, createWeatherStationFeature),
        [stations]
    )

    useMapErrors(ERRORS.WEATHER_STATION, error)
    useSymbolLayer(map, key, features, visible)
}

export function useMountainConditionReports(map) {
    const key = MOUNTAIN_CONDITIONS_REPORTS
    const { visible } = useLayerState(key)
    const id = useSearchPanelId(products.MOUNTAIN_CONDITIONS_REPORT)
    const [[reports, report], , errors] = useMerge(
        mcr.useReports(),
        mcr.useReport(id)
    )
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

    useMapErrors(ERRORS.MOUNTAIN_CONDITIONS_REPORT, ...errors)
    useSymbolLayer(map, key, features, visible)
    useSymbolLayer(map, key + '-single', single, visible, STYLES[key].symbol)
}

export function useFatalAccidents(map) {
    const key = FATAL_ACCIDENT
    const { visible } = useLayerState(key)
    const [documents, , error] = prismic.useDocuments(params.fatal.accidents())
    const features = useMemo(
        () => createFeatureCollection(documents, createFatalAccidentFeature),
        [documents]
    )

    useMapErrors(ERRORS.INCIDENT, error)
    useSymbolLayer(map, key, features, visible)
}

export function useMountainInformationNetwork(map) {
    let key = MOUNTAIN_INFORMATION_NETWORK
    const { visible, filters } = useLayerState(key)
    const { days, types } = filters
    const [data = EMPTY_ARRAY, pending, errorReports] = min.useReports(days)
    const [others, incidents] = useMemo(() => {
        const features = data.map(createMountainInformationNetworkFeature)

        return [
            turf.featureCollection(features.filter(isNotIncident)),
            turf.featureCollection(features.filter(isIncident)),
        ]
    }, [data])
    const filter = useMemo(
        () => createMountainInformationNetworkFilter(types),
        [types]
    )

    // Incident icons
    key = MOUNTAIN_INFORMATION_NETWORK + '-incidents'
    let style = STYLES[MOUNTAIN_INFORMATION_NETWORK].symbol
    let layer = createLayer(key, key, 'symbol', style)

    mapbox.useSource(map, key, GEOJSON, incidents)
    mapbox.useLayer(map, layer, undefined, visible, filter, EVENTS)

    // Other icons
    key = MOUNTAIN_INFORMATION_NETWORK
    layer = createLayer(key, key, 'symbol')

    mapbox.useSource(map, key, CLUSTER, others)
    mapbox.useLayer(map, layer, undefined, visible, filter, EVENTS)

    // Active report, because a report could be filtered out by the filters...
    key = MOUNTAIN_INFORMATION_NETWORK + '-active-report'
    style = STYLES[MOUNTAIN_INFORMATION_NETWORK].symbol
    layer = createLayer(key, key, 'symbol', style)

    let id = useSearchPanelId(products.MOUNTAIN_INFORMATION_NETWORK)

    if (!pending) {
        id = data.some(({ subid }) => subid === id) ? null : id
    }

    const [report, , errorReport] = min.useReport(id)
    const activeReport = useMemo(() => {
        if (!report) {
            return EMPTY_FEATURE_COLLECTION
        }

        return turf.featureCollection([
            createMountainInformationNetworkFeature(report),
        ])
    }, [report])

    mapbox.useSource(map, key, GEOJSON, activeReport)
    mapbox.useLayer(map, layer, undefined, true, undefined, EVENTS)

    useMapErrors(ERRORS.MOUNTAIN_INFORMATION_NETWORK, errorReports, errorReport)
}

// Utils for MIN
function createMountainInformationNetworkFeature({
    subid,
    title,
    lnglat,
    obs,
}) {
    return turf.point(lnglat, {
        title,
        panel: createPath(products.MOUNTAIN_INFORMATION_NETWORK, subid),
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

// Errors handling
function useMapErrors(type, ...errors) {
    const state = useMapState()

    useEffect(() => {
        for (const error of errors.filter(Boolean)) {
            captureException(error, { type })
            state.errors.add(type, error)
        }
    }, errors)
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
function findIcon({ from, to }) {
    const now = new Date()

    return new Date(from) < now && now < new Date(to)
}
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

    mapbox.useSource(map, key, CLUSTER, features || EMPTY_FEATURE_COLLECTION)
    mapbox.useLayer(map, layer, undefined, visible, undefined, EVENTS)
}
function createLayer(id, source, type, styles = STYLES[source][type]) {
    return { id, source, type, ...styles }
}
function createWeatherStationFeature({ stationId, name, longitude, latitude }) {
    return turf.point([longitude, latitude], {
        title: name,
        panel: createPath(products.WEATHER_STATION, stationId),
    })
}
function createMountainConditionReportFeature({ location, title, id }) {
    return turf.point(location, {
        title,
        panel: createPath(products.MOUNTAIN_CONDITIONS_REPORT, id),
    })
}
function createFatalAccidentFeature({ uid, data }) {
    const { location, title } = data

    return turf.point([location.longitude, location.latitude], {
        title,
        panel: createPath(products.ACCIDENT, uid),
    })
}
function useSearchPanelId(product) {
    const params = useSecondaryDrawer()

    return params.product === product ? params.id : null
}

// Constants
// TODO(i18n) Should use "useTitles" from module "constants/drawers"
const TITLES = new Map([
    [WEATHER_STATION, 'weather stations'],
    [MOUNTAIN_INFORMATION_NETWORK, 'Mountain Information Network reports'],
    [FATAL_ACCIDENT, 'fatal recretional accidents'],
    [HOT_ZONE_REPORTS, 'advisories'],
    [MOUNTAIN_CONDITIONS_REPORTS, 'Mountain Condition reports'],
    [FORECASTS, 'forecast'],
])
const EMPTY_FEATURE_COLLECTION = turf.featureCollection([])
const EMPTY_ARRAY = []

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
