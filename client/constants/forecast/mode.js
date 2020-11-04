import { useMemo } from 'react'
import { useIntl } from 'react-intl'

export const OFF_SEASON = 'offseason'
export const SPRING_SITUATION = 'spring-situation'
export const EARLY_SEASON = 'early-season'

export default new Set([OFF_SEASON, SPRING_SITUATION, EARLY_SEASON])

export function useText(mode) {
    const texts = useTexts()

    return texts.get(mode)
}

export function useTexts() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    OFF_SEASON,
                    intl.formatMessage({
                        description: 'FX mode OFF_SEASON',
                        defaultMessage: 'Off season',
                    }),
                ],
                [
                    SPRING_SITUATION,
                    intl.formatMessage({
                        description: 'FX mode SPRING_SITUATION',
                        defaultMessage: 'Spring Conditions',
                    }),
                ],
                [
                    EARLY_SEASON,
                    intl.formatMessage({
                        description: 'FX mode EARLY_SEASON',
                        defaultMessage: 'Early Season Conditions',
                    }),
                ],
            ]),
        [intl]
    )
}
