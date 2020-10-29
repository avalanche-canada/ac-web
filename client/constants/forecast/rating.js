import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import * as ForecastPalette from 'constants/forecast/palette'

export const LOW = 'LOW'
export const MODERATE = 'MODERATE'
export const CONSIDERABLE = 'CONSIDERABLE'
export const HIGH = 'HIGH'
export const EXTREME = 'EXTREME'
export const NO_RATING = 'NO_RATING'

export const LEVELS = [NO_RATING, LOW, MODERATE, CONSIDERABLE, HIGH, EXTREME]

export default new Set(LEVELS)

export function useTravelAdvices() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    EXTREME,
                    intl.formatMessage({
                        description: 'Travel Advice message for EXTREME',
                        defaultMessage: 'Avoid all avalanche terrain.',
                    }),
                ],
                [
                    HIGH,
                    intl.formatMessage({
                        description: 'Travel Advice message for HIGH',
                        defaultMessage:
                            'Very dangerous avalanche conditions. Travel in avalanche terrain not recommended.',
                    }),
                ],
                [
                    CONSIDERABLE,
                    intl.formatMessage({
                        description: 'Travel Advice message for CONSIDERABLE',
                        defaultMessage:
                            'Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.',
                    }),
                ],
                [
                    MODERATE,
                    intl.formatMessage({
                        description: 'Travel Advice message for MODERATE',
                        defaultMessage:
                            'Heightened avalanche conditions on specific terrain features. Evaluate snow and terrain carefully; identify features of concern.',
                    }),
                ],
                [
                    LOW,
                    intl.formatMessage({
                        description: 'Travel Advice message for LOW',
                        defaultMessage:
                            'Generally safe avalanche conditions. Watch for unstable snow on isolated terrain features.',
                    }),
                ],
                [NO_RATING, null],
            ]),
        []
    )
}

export function useLikehoodOfAvalanche() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    EXTREME,
                    intl.formatMessage({
                        description:
                            'Likelihood of Avalanche message for EXTREME',
                        defaultMessage:
                            'Natural and human-triggered avalanches certain.',
                    }),
                ],
                [
                    HIGH,
                    intl.formatMessage({
                        description: 'Likelihood of Avalanche message for HIGH',
                        defaultMessage:
                            'Natural avalanches likely; human-triggered avalanches very likely.',
                    }),
                ],
                [
                    CONSIDERABLE,
                    intl.formatMessage({
                        description:
                            'Likelihood of Avalanche message for CONSIDERABLE',
                        defaultMessage:
                            'Natural avalanches possible; human-triggered avalanches likely.',
                    }),
                ],
                [
                    MODERATE,
                    intl.formatMessage({
                        description:
                            'Likelihood of Avalanche message for MODERATE',
                        defaultMessage:
                            'Natural avalanches unlikely; human-triggered avalanches possible.',
                    }),
                ],
                [
                    LOW,
                    intl.formatMessage({
                        description: 'Likelihood of Avalanche message for LOW',
                        defaultMessage:
                            'Natural and human-triggered avalanches unlikely.',
                    }),
                ],
                [NO_RATING, null],
            ]),
        []
    )
}

export const Palette = new Map([
    [EXTREME, ForecastPalette.BLACK],
    [HIGH, ForecastPalette.RED],
    [CONSIDERABLE, ForecastPalette.ORANGE],
    [MODERATE, ForecastPalette.YELLOW],
    [LOW, ForecastPalette.GREEN],
    [NO_RATING, ForecastPalette.WHITE],
])

export function useSizeAndDistribution() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    EXTREME,
                    intl.formatMessage({
                        description:
                            'Size and Distribution message for EXTREME',
                        defaultMessage:
                            'Large to very large avalanches in many areas.',
                    }),
                ],
                [
                    HIGH,
                    intl.formatMessage({
                        description: 'Size and Distribution message for HIGH',
                        defaultMessage:
                            'Large avalanches in many areas; or very large avalanches in specific areas.',
                    }),
                ],
                [
                    CONSIDERABLE,
                    intl.formatMessage({
                        description:
                            'Size and Distribution message for CONSIDERABLE',
                        defaultMessage:
                            'Small avalanches in many areas; or large avalanches in specific areas; or very large avalanches in isolated areas.',
                    }),
                ],
                [
                    MODERATE,
                    intl.formatMessage({
                        description:
                            'Size and Distribution message for MODERATE',
                        defaultMessage:
                            'Small avalanches in specific areas; or large avalanches in isolated areas.',
                    }),
                ],
                [
                    LOW,
                    intl.formatMessage({
                        description: 'Size and Distribution message for LOW',
                        defaultMessage:
                            'Small avalanches in isolated areas or extreme terrain.',
                    }),
                ],
                [NO_RATING, null],
            ]),
        []
    )
}

export function useTexts() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    EXTREME,
                    intl.formatMessage({
                        description: 'Ratings Texts for EXTREME',
                        defaultMessage: '5 - Extreme',
                    }),
                ],
                [
                    HIGH,
                    intl.formatMessage({
                        description: 'Ratings Texts for HIGH',
                        defaultMessage: '4 - High',
                    }),
                ],
                [
                    CONSIDERABLE,
                    intl.formatMessage({
                        description: 'Ratings Texts for CONSIDERABLE',
                        defaultMessage: '3 - Considerable',
                    }),
                ],
                [
                    MODERATE,
                    intl.formatMessage({
                        description: 'Ratings Texts for MODERATE',
                        defaultMessage: '2 - Moderate',
                    }),
                ],
                [
                    LOW,
                    intl.formatMessage({
                        description: 'Ratings Texts for LOW',
                        defaultMessage: '1 - Low',
                    }),
                ],
                [
                    NO_RATING,
                    intl.formatMessage({
                        description: 'Ratings Texts for NO_RATING',
                        defaultMessage: '0 - No Rating',
                    }),
                ],
            ]),
        []
    )
}

export function useText(rating) {
    const texts = useTexts()

    return texts.get(rating)
}
