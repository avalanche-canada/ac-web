import { useIntlMemo } from 'hooks/intl'

export const GENERIC = 'generic'
export const STATIC_PAGE = 'static-page'
export const EVENT = 'event'
export const BLOG = 'blog'
export const NEWS = 'news'
export const FATAL_ACCIDENT = 'fatal-accident'
export const HOTZONE_REPORT = 'hotzone-report'
export const WEATHER_FORECAST = 'weather-forecast'
export const WEATHER_TUTORIAL = 'weather-forecast-tutorial'
export const SPAW = 'spaw'
export const HIGHLIGHT = 'highlight'
export const TUTORIAL = 'tutorial'
export const TUTORIAL_ARTICLE = 'tutorial-article'
export const DEFINITION = 'definition'
export const GLOSSARY = 'glossary'
export const SPONSOR = 'sponsor'

export const FEED = [BLOG, EVENT, NEWS]

export function useFeedTexts() {
    return useIntlMemo(
        intl =>
            new Map([
                [
                    BLOG,
                    intl.formatMessage({
                        description: 'Constants prismic',
                        defaultMessage: 'Blog',
                    }),
                ],
                [
                    NEWS,
                    intl.formatMessage({
                        description: 'Constants prismic',
                        defaultMessage: 'News',
                    }),
                ],
                [
                    EVENT,
                    intl.formatMessage({
                        description: 'Constants prismic',
                        defaultMessage: 'Event',
                    }),
                ],
            ])
    )
}
