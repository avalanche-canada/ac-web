import { useIntlMemo } from 'hooks/intl'

export const FORECASTS = 'FORECASTS'
export const HOT_ZONE_REPORTS = 'HOT_ZONE_REPORTS'
export const MOUNTAIN_INFORMATION_NETWORK = 'MOUNTAIN_INFORMATION_NETWORK'
export const MOUNTAIN_INFORMATION_NETWORK_INCIDENTS =
    'MOUNTAIN_INFORMATION_NETWORK_INCIDENTS'
export const WEATHER_STATION = 'WEATHER_STATION'
export const FATAL_ACCIDENT = 'FATAL_ACCIDENT'
export const MOUNTAIN_CONDITIONS_REPORTS = 'MOUNTAIN_CONDITIONS_REPORTS'

export default [
    FORECASTS,
    HOT_ZONE_REPORTS,
    MOUNTAIN_INFORMATION_NETWORK,
    MOUNTAIN_INFORMATION_NETWORK_INCIDENTS,
    WEATHER_STATION,
    FATAL_ACCIDENT,
    MOUNTAIN_CONDITIONS_REPORTS,
]

export function useTitle(layer) {
    const titles = useTitles()

    return titles.get(layer)
}

export function useTitles() {
    return useIntlMemo(
        intl =>
            new Map([
                [
                    FORECASTS,
                    intl.formatMessage({
                        id: 'avalanche-forecasts',
                        defaultMessage: 'Avalanche Forecasts',
                    }),
                ],
                [
                    HOT_ZONE_REPORTS,
                    intl.formatMessage({
                        id: 'avalanche-advisories',
                        defaultMessage: 'Avalanche Advisories',
                    }),
                ],
                [
                    MOUNTAIN_INFORMATION_NETWORK,
                    intl.formatMessage({
                        id: 'mountain-information-network',
                        defaultMessage: 'Mountain Information Network',
                    }),
                ],
                [
                    MOUNTAIN_CONDITIONS_REPORTS,
                    intl.formatMessage({
                        id: 'mountain-conditions-reports',
                        defaultMessage: 'Mountain Conditions Reports',
                    }),
                ],
                [
                    WEATHER_STATION,
                    intl.formatMessage({
                        id: 'weather-stations',
                        defaultMessage: 'Weather stations',
                    }),
                ],
                [
                    FATAL_ACCIDENT,
                    intl.formatMessage({
                        id: 'fatal-recreational-accidents',
                        defaultMessage: 'Fatal Recreational Accidents',
                    }),
                ],
            ])
    )
}
