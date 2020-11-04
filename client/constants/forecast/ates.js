import { useMemo } from 'react'
import { useIntl } from 'react-intl'

export const SIMPLE = 1
export const CHALLENGING = 2
export const COMPLEX = 3

export default new Set([SIMPLE, CHALLENGING, COMPLEX])

export function useRatingTexts() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    SIMPLE,
                    intl.formatMessage({
                        description: 'ATES Rating',
                        defaultMessage: 'Simple',
                    }),
                ],
                [
                    CHALLENGING,
                    intl.formatMessage({
                        description: 'ATES Rating',
                        defaultMessage: 'Challenging',
                    }),
                ],
                [
                    COMPLEX,
                    intl.formatMessage({
                        description: 'ATES Rating',
                        defaultMessage: 'Complex',
                    }),
                ],
            ]),
        [intl.locale]
    )
}

export function useRatingText(rating) {
    const texts = useRatingTexts()

    return texts.get(rating)
}

export function useRatingDescriptions() {
    const intl = useIntl()

    return useMemo(
        () =>
            new Map([
                [
                    SIMPLE,
                    intl.formatMessage({
                        description: 'ATES Rating Description',
                        defaultMessage:
                            'Exposure to low angle or primarily forested terrain. Some forest openings may involve the runout zones of infrequent avalanches. Many options to reduce or eliminate exposure. No glacier travel.',
                    }),
                ],
                [
                    CHALLENGING,
                    intl.formatMessage({
                        description: 'ATES Rating Description',
                        defaultMessage:
                            'Exposure to well defined avalanche paths, starting zones or terrain traps; options exist to reduce or eliminate exposure with careful route-finding. Glacier travel is straightforward but crevasse hazards may exist.',
                    }),
                ],
                [
                    COMPLEX,
                    intl.formatMessage({
                        description: 'ATES Rating Description',
                        defaultMessage:
                            'Exposure to multiple overlapping avalanche paths or large expanses of steep, open terrain; multiple avalanche starting zones and terrain traps below; minimal options to reduce exposure. Complicated glacier travel with extensive crevasse bands or icefalls.',
                    }),
                ],
            ]),
        [intl.locale]
    )
}
