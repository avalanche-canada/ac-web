import { useMemo } from 'react'
import { useIntl } from 'react-intl'

export const ALP = 'ALP'
export const TLN = 'TLN'
export const BTL = 'BTL'

export default new Set([ALP, TLN, BTL])

export const Palette = new Map([
    [ALP, '#FFFFFF'],
    [TLN, '#C1D831'],
    [BTL, '#6EA469'],
])

export function useText(elevation) {
    const texts = useTexts()

    return texts.get(elevation)
}

export function useTexts() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    ALP,
                    intl.formatMessage({
                        description: 'Elevation text',
                        defaultMessage: 'Alpine',
                    }),
                ],
                [
                    TLN,
                    intl.formatMessage({
                        description: 'Elevation text',
                        defaultMessage: 'Treeline',
                    }),
                ],
                [
                    BTL,
                    intl.formatMessage({
                        description: 'Elevation text',
                        defaultMessage: 'Below treeline',
                    }),
                ],
            ]),
        [intl]
    )
}
