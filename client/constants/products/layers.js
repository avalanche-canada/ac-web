import { useIntlMemo } from 'hooks/intl'
import * as Products from './'

export function useTitle(product) {
    const titles = useTitles()

    return titles.get(product)
}

function useTitles() {
    return useIntlMemo(
        intl =>
            new Map([
                [
                    Products.FORECAST,
                    intl.formatMessage({
                        id: 'avalanche-forecasts',
                        defaultMessage: 'Avalanche Forecasts',
                    }),
                ],
                [
                    Products.ADVISORY,
                    intl.formatMessage({
                        id: 'avalanche-advisories',
                        defaultMessage: 'Avalanche Advisories',
                    }),
                ],
                [
                    Products.MOUNTAIN_INFORMATION_NETWORK,
                    intl.formatMessage({
                        id: 'mountain-information-network',
                        defaultMessage: 'Mountain Information Network',
                    }),
                ],
                [
                    Products.MOUNTAIN_CONDITIONS_REPORT,
                    intl.formatMessage({
                        id: 'mountain-conditions-reports',
                        defaultMessage: 'Mountain Conditions Reports',
                    }),
                ],
                [
                    Products.WEATHER_STATION,
                    intl.formatMessage({
                        id: 'weather-stations',
                        defaultMessage: 'Weather stations',
                    }),
                ],
                [
                    Products.ACCIDENT,
                    intl.formatMessage({
                        id: 'fatal-recreational-accidents',
                        defaultMessage: 'Fatal Recreational Accidents',
                    }),
                ],
            ])
    )
}
