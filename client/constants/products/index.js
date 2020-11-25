export const FORECAST = 'forecast'
export const OFFSEASON = 'offseason'
export const ADVISORY = 'advisory'
export const MOUNTAIN_INFORMATION_NETWORK = 'mountain-information-network'
export const MOUNTAIN_CONDITIONS_REPORT = 'mountain-conditions-report'
export const ACCIDENT = 'accident'
export const WEATHER_STATION = 'weather-station'
export const SPAW = 'spaw'

export function isKindOfForecast(product) {
    return ExtendedForecastProducts.has(product)
}

const ExtendedForecastProducts = new Set([FORECAST, OFFSEASON])
