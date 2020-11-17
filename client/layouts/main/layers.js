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
import * as forecast from 'hooks/async/forecast'
import * as features from 'hooks/async/features'
import * as weather from 'hooks/async/weather'
import * as mcr from 'hooks/async/mcr'
import * as min from 'hooks/async/min'
import * as prismic from 'prismic/hooks'
import * as params from 'prismic/params'
import { useSource, useLayer, useMarkers } from 'hooks/mapbox'
import { useMapState, ERRORS } from 'contexts/map/state'
import { INCIDENT } from 'constants/min'
import { useLayer as useLayerState } from 'contexts/layers'
import { useLocation } from 'router/hooks'
import externals, { open } from 'router/externals'
import { usePrimaryDrawerParams, useSecondaryDrawerParams } from './drawers/hooks'
import { path } from 'utils/url'
import { captureException } from 'services/sentry'
import { useMerge } from 'hooks/async'

export function useForecastRegions(map) {
    const key = FORECASTS
    const IDS = [key, key + '-line', key + '-labels']
    const { visible } = useLayerState(key)
    const [regions, , error] = features.useForecastRegions()
    const [sourceLoaded, setSourceLoaded] = useState(false)
    const { type, id } = usePrimaryDrawerParams()

    useMapError(ERRORS.FORECAST, error)

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

    useSource(map, key, { ...GEOJSON, generateId: true }, regions || EMPTY_FEATURE_COLLECTION)
    useLayer(map, createLayer(IDS[0], key, 'fill'), undefined, visible, undefined, EVENTS)
    useLayer(map, createLayer(IDS[1], key, 'line'), undefined, visible, undefined, EVENTS)
    useLayer(map, createLayer(IDS[2], key, 'symbol'), undefined, visible, undefined, EVENTS)
}

export function useForecastMarkers(map) {
    const key = FORECASTS
    const [[metadata, forecasts], , errors] = useMerge(
        features.useForecastRegionsMetadata(),
        forecast.useForecasts()
    )
    const { visible } = useLayerState(key)
    const { location, navigate } = useLocation()
    const definitions = useMemo(() => {
        if (!forecasts || !Array.isArray(metadata)) {
            return
        }

        return metadata
            .filter(({ id }) => Boolean(forecasts[id]))
            .map(({ id, name, centroid, type }) => {
                const element = document.createElement('img')
                const forecast = forecasts[id]

                element.style.cursor = 'pointer'

                Object.assign(element, {
                    src:
                        type === 'link'
                            ? ICONS.get('LINK').call()
                            : createForecastIconURL(forecast),
                    width: 50,
                    height: 50,
                    alt: name,
                    title: name,
                    onclick(event) {
                        event.stopPropagation()

                        if (externals.has(id)) {
                            open(id)
                        } else {
                            navigate('/map/forecasts/' + id + location.search)
                        }
                    },
                })

                return [centroid, { element }]
            })
    }, [metadata, forecasts])

    useMapError(ERRORS.FORECAST, ...errors)

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
    const [stations, , error] = weather.useStations()
    const features = useMemo(() => createFeatureCollection(stations, createWeatherStationFeature), [
        stations,
    ])

    useMapError(ERRORS.WEATHER_STATION, error)
    useSymbolLayer(map, key, features, visible)
}

export function useMountainConditionReports(map) {
    const key = MOUNTAIN_CONDITIONS_REPORTS
    const { visible } = useLayerState(key)
    const id = useSearchPanelId('mountain-conditions-reports')
    const [[reports, report], , errors] = useMerge(mcr.useReports(), mcr.useReport(id))
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
            createFeatureCollection([report].filter(Boolean), createMountainConditionReportFeature),
        [report]
    )

    useMapError(ERRORS.MOUNTAIN_CONDITIONS_REPORT, ...errors)
    useSymbolLayer(map, key, features, visible)
    useSymbolLayer(map, key + '-single', single, visible, STYLES[key].symbol)
}

export function useFatalAccidents(map) {
    const key = FATAL_ACCIDENT
    const { visible } = useLayerState(key)
    const [documents, , error] = prismic.useDocuments(params.fatal.accidents())
    const features = useMemo(() => createFeatureCollection(documents, createFatalAccidentFeature), [
        documents,
    ])

    useMapError(ERRORS.INCIDENT, error)
    useSymbolLayer(map, key, features, visible)
}

export function useAdvisories(map) {
    const key = HOT_ZONE_REPORTS
    const layer = createLayer(key, key, 'circle')
    const { visible } = useLayerState(key)
    const [[areas, documents], , errors] = useMerge(
        features.useAdvisoriesMetadata(),
        prismic.useDocuments(params.hotZone.reports())
    )
    const advisories = useMemo(() => {
        if (!Array.isArray(areas) || !Array.isArray(documents)) {
            return EMPTY_FEATURE_COLLECTION
        }

        const regions = new Set(documents.map(pluckRegion))
        function createFeature(zone) {
            return createAdvisoryFeature(zone, regions.has(zone.id))
        }

        return createFeatureCollection(areas, createFeature)
    }, [areas, documents])

    useMapError(ERRORS.ADVISORY, ...errors)

    useSource(map, key, GEOJSON, advisories)
    useLayer(map, layer, undefined, visible, undefined, EVENTS)
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
    const filter = useMemo(() => createMountainInformationNetworkFilter(types), [types])

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
    layer = createLayer(key, key, 'symbol', style)

    let id = useSearchPanelId('mountain-information-network-submissions')

    if (!pending) {
        id = data.some(({ subid }) => subid === id) ? null : id
    }

    const [report, , errorReport] = min.useReport(id)
    const activeReport = useMemo(() => {
        if (!report) {
            return EMPTY_FEATURE_COLLECTION
        }

        return turf.featureCollection([createMountainInformationNetworkFeature(report)])
    }, [report])

    useSource(map, key, GEOJSON, activeReport)
    useLayer(map, layer, undefined, true, undefined, EVENTS)

    useMapError(ERRORS.MOUNTAIN_INFORMATION_NETWORK, errorReports, errorReport)
}

// Utils for MIN
function createMountainInformationNetworkFeature({ subid, title, lnglat, obs }) {
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

    return ['any', ...Array.from(types, type => ['boolean', ['get', type], false])]
}
function isIncident({ properties }) {
    return INCIDENT in properties
}
function isNotIncident(feature) {
    return !isIncident(feature)
}

// Errors handling
function useMapError(type, ...errors) {
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
function createForecastIconURL({ iconSet }) {
    const now = new Date()
    const icon = iconSet.find(({ from, to }) => new Date(from) < now && now < new Date(to))
    const { iconType } = icon || {}

    if (!ICONS.has(iconType)) {
        return ''
    }

    const createURL = ICONS.get(iconType)

    return createURL(icon)
}
const GRAPHICS = 'https://avalanche.ca/api/forecasts/graphics'
const ICONS = new Map([
    [
        'RATINGS',
        ({ ratings: { alp, tln, btl } }) => path(GRAPHICS, alp, tln, btl, 'danger-rating-icon.svg'),
    ],
    ['SPRING', () => path(GRAPHICS, 'spring.svg')],
    ['OFF_SEASON', () => path(GRAPHICS, 'off-season.svg')],
    ['EARLY_SEASON', () => path(GRAPHICS, 'early-season.svg')],
    ['LINK', () => path(GRAPHICS, 'link.svg')],
])
function handleMouseMove({ target, features }) {
    // This is the best way to handle title!
    // mouseenter does not work as well
    const canvas = target.getCanvas()
    const [feature] = features
    const { name, title, point_count, cluster } = feature.properties

    canvas.title = cluster ? `${point_count} ${TITLES.get(feature.source)}` : name || title
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

    useSource(map, key, CLUSTER, features || EMPTY_FEATURE_COLLECTION)
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
    const params = useSecondaryDrawerParams()

    return useMemo(() => (params.type === type ? params.id : null), [params])
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
                'line-width': ['case', ['boolean', ['feature-state', 'active'], false], 4, 1.5],
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
                'icon-size': ['case', ['boolean', ['get', 'cluster'], false], 0.8, 0.7],
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
