import { useIntlMemo } from 'hooks/intl'
import * as Colors from 'components/icons/min/colors'

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
    [QUICK, Colors.QUICK],
    [AVALANCHE, Colors.AVALANCHE],
    [SNOWPACK, Colors.SNOWPACK],
    [WEATHER, Colors.WEATHER],
    [INCIDENT, Colors.INCIDENT],
])
