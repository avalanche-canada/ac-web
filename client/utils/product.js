import * as products from 'constants/products'
import * as urls from 'utils/url'

export function createPath(product, id, prefix = '/map') {
    return urls.path(
        isAnalysis(product) ? prefix : null,
        PATHS.get(product),
        id
    )
}

export function createSearchParams(product, id) {
    const params = new URLSearchParams()

    params.set('panel', createPath(product, id))

    return params
}

export function isAnalysis(product) {
    return ANALYSIS_PRODUCTS.has(product)
}

export function isObservations(product) {
    return OBSERVATION_PRODUCTS.has(product)
}

export function computeProductParams(pathname) {
    const [path, id] = pathname
        .split('/')
        .filter(Boolean)
        .filter(chunk => chunk !== 'map')

    return {
        product: REVERSE_PATHS.get(path),
        id,
    }
}

const PATHS = new Map([
    [products.FORECAST, 'forecasts'],
    [products.ADVISORY, 'advisories'],
    [products.WEATHER_STATION, 'weather-stations'],
    [products.MOUNTAIN_CONDITIONS_REPORT, 'mountain-conditions-reports'],
    [products.ACCIDENT, 'fatal-accidents'],
    [
        products.MOUNTAIN_INFORMATION_NETWORK,
        'mountain-information-network-submissions',
    ],
])
const REVERSE_PATHS = new Map(
    Object.entries(Object.fromEntries(PATHS)).map(([k, v]) => [v, k])
)
const ANALYSIS_PRODUCTS = new Set([products.FORECAST, products.ADVISORY])
const OBSERVATION_PRODUCTS = new Set(
    Array.from(PATHS.keys()).filter(product => !ANALYSIS_PRODUCTS.has(product))
)
