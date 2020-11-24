import * as MIN_COLORS from 'components/icons/min/colors'
import { useIntlMemo } from 'hooks/intl'

export const QUICK = 'quick'
export const WEATHER = 'weather'
export const SNOWPACK = 'snowpack'
export const AVALANCHE = 'avalanche'
export const INCIDENT = 'incident'

export const TYPES = [QUICK, AVALANCHE, SNOWPACK, WEATHER, INCIDENT]

export function useName(type) {
    const names = useNames()

    return names.get(type)
}

export function useNames() {
    return useIntlMemo(intl => {
        const description = 'MIN Report type name'

        return new Map([
            [
                QUICK,
                intl.formatMessage({
                    description,
                    defaultMessage: 'Quick',
                }),
            ],
            [
                AVALANCHE,
                intl.formatMessage({
                    description,
                    defaultMessage: 'Avalanche',
                }),
            ],
            [
                SNOWPACK,
                intl.formatMessage({
                    description,
                    defaultMessage: 'Snowpack',
                }),
            ],
            [
                WEATHER,
                intl.formatMessage({
                    description,
                    defaultMessage: 'Weather',
                }),
            ],
            [
                INCIDENT,
                intl.formatMessage({
                    description,
                    defaultMessage: 'Incident',
                }),
            ],
        ])
    })
}

export const COLORS = new Map([
    [QUICK, MIN_COLORS.QUICK],
    [AVALANCHE, MIN_COLORS.AVALANCHE],
    [SNOWPACK, MIN_COLORS.SNOWPACK],
    [WEATHER, MIN_COLORS.WEATHER],
    [INCIDENT, MIN_COLORS.INCIDENT],
])
