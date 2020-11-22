import { useIntlMemo } from 'hooks/intl'
import {
    FORECAST,
    OFFSEASON,
    ADVISORY,
    MOUNTAIN_INFORMATION_NETWORK,
    MOUNTAIN_CONDITIONS_REPORT,
    ACCIDENT,
    WEATHER_STATION,
    SPAW,
} from './'

export default function useNames() {
    const description = 'Product name'

    return useIntlMemo(
        intl =>
            new Map([
                [
                    FORECAST,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Avalanche Forecast',
                    }),
                ],
                [
                    OFFSEASON,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Off Season Message',
                    }),
                ],
                [
                    ADVISORY,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Avalanche Advisory',
                    }),
                ],
                [
                    MOUNTAIN_INFORMATION_NETWORK,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Mountain Information Network',
                    }),
                ],
                [
                    MOUNTAIN_CONDITIONS_REPORT,
                    intl.formatMessage({
                        description,
                        defaultMessage: "Arc'teryx Mountain Conditions Report",
                    }),
                ],
                [
                    ACCIDENT,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Fatal Recreational Accident',
                    }),
                ],
                [
                    WEATHER_STATION,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Weather Station',
                    }),
                ],
                [
                    SPAW,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Special Public Avalanche Warning',
                    }),
                ],
            ])
    )
}

export function useName(product) {
    const names = useNames()

    return names.get(product)
}
