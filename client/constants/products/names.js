import { useIntlMemo } from 'hooks/intl'
import * as Products from './'

export function useName(product) {
    const names = useNames()

    return names.get(product)
}

export default function useNames() {
    const description = 'Product name'

    return useIntlMemo(
        intl =>
            new Map([
                [
                    Products.FORECAST,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Avalanche Forecast',
                    }),
                ],
                [
                    Products.OFFSEASON,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Off Season Message',
                    }),
                ],
                [
                    Products.ADVISORY,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Avalanche Advisory',
                    }),
                ],
                [
                    Products.MOUNTAIN_INFORMATION_NETWORK,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Mountain Information Network',
                    }),
                ],
                [
                    Products.MOUNTAIN_CONDITIONS_REPORT,
                    intl.formatMessage({
                        description,
                        defaultMessage: "Arc'teryx Mountain Conditions Report",
                    }),
                ],
                [
                    Products.ACCIDENT,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Fatal Recreational Accident',
                    }),
                ],
                [
                    Products.WEATHER_STATION,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Weather Station',
                    }),
                ],
                [
                    Products.SPAW,
                    intl.formatMessage({
                        description,
                        defaultMessage: 'Special Public Avalanche Warning',
                    }),
                ],
            ])
    )
}
