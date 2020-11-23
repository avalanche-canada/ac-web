import { useIntlMemo } from 'hooks/intl'

export const ALP = 'alp'
export const TLN = 'tln'
export const BTL = 'btl'

export default new Set([ALP, TLN, BTL])

export function useText(elevation) {
    const texts = useTexts()

    return texts.get(elevation)
}

export function useTexts() {
    return useIntlMemo(
        intl =>
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
            ])
    )
}
