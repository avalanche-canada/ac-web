import { useMemo } from 'react'
import { useIntl } from 'react-intl'

export const FORECAST = 'forecast'
export const ADVISORY = 'advisory'
export const SPAW = 'spaw'
export const HOTZONE = 'hot-zone'

export default new Set([SPAW, FORECAST, ADVISORY, HOTZONE])

export function useText(type) {
    const texts = useTexts()

    return texts.get(type)
}

function useTexts() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    FORECAST,
                    intl.formatMessage({
                        defaultMessage: 'Avalanche Forecast',
                    }),
                ],
                [
                    ADVISORY,
                    intl.formatMessage({
                        defaultMessage: 'Advisory',
                    }),
                ],
                [
                    SPAW,
                    intl.formatMessage({
                        defaultMessage: 'Special Public Avalanche Warning',
                    }),
                ],
                [
                    HOTZONE,
                    intl.formatMessage({
                        defaultMessage: 'Hot Zone',
                    }),
                ],
            ]),
        [intl.locale]
    )
}
