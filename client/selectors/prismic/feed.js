import { createSelector, createStructuredSelector } from 'reselect'
import { getDocumentsOfType, getResult } from 'getters/prismic'
import months, { options as monthOptions } from './months'
import { parse } from 'prismic'
import computeYearOptions from './computeYearOptions'
import computeCategoryOptions from './computeCategoryOptions'
import computeTagsOptions from './computeTagsOptions'
import {
    getType,
    getStatusFactory,
    getDocumentsFromResult,
} from 'selectors/prismic/utils'
import isBefore from 'date-fns/is_before'
import startOfDay from 'date-fns/start_of_day'

export const NEWS = 'news'
export const BLOG = 'blog'
export const EVENT = 'event'

export const TYPES = [NEWS, BLOG, EVENT]

const PAST = 'past'
const UPCOMING = 'upcoming'

const timelineOptions = new Map([
    [UPCOMING, 'Upcoming events'],
    [PAST, 'Past events'],
])

function isFeatured(post) {
    return post.featured
}

const PREDICATES = new Map([
    ['year', ({ year }) => post => post.year == year], // == works with strings and numbers
    ['month', ({ month }) => post => post.month === months.indexOf(month) - 1],
    ['category', ({ category }) => post => post.category == category],
    [
        'tags',
        ({ tags }) => post => Boolean(post.tags.find(tag => tags.has(tag))),
    ],
    [
        'timeline',
        ({ timeline }) => post => {
            const isPast = isBefore(post.endDate, startOfDay(new Date()))

            return timeline === PAST ? isPast : !isPast
        },
    ],
])

function descending(a, b) {
    return b.date - a.date
}

function ascending(a, b) {
    return a.date - b.date
}

const SORTERS = new Map([
    [NEWS, descending],
    [BLOG, descending],
    [EVENT, ascending],
])

function getPredicates(state, props) {
    const predicates = []

    PREDICATES.forEach((predicate, name) => {
        if (name in props && props[name]) {
            if (props[name] instanceof Set && props[name].size === 0) {
                return
            }

            predicates.push(predicate)
        }
    })

    return predicates.map(predicate => predicate.call(null, props))
}

function getFeed(state, { type }) {
    return getDocumentsOfType(state, type)
}

const getTransformedFeed = createSelector(getFeed, getType, (feed, type) => {
    const sorted = feed
        .toList()
        .map(post => parse(post))
        .sort(SORTERS.get(type))

    if (sorted.some(isFeatured)) {
        // Bringing the first featured one on top!
        const featured = sorted.find(isFeatured)
        const index = sorted.indexOf(featured)

        return sorted.remove(index).unshift(featured)
    } else {
        return sorted
    }
})

const getFeedOptions = createSelector(
    getTransformedFeed,
    getType,
    (feed, type) => {
        switch (type) {
            case NEWS:
                return {
                    month: monthOptions,
                    year: computeYearOptions(feed),
                    tag: computeTagsOptions(feed),
                }
            case BLOG:
                return {
                    month: monthOptions,
                    year: computeYearOptions(feed),
                    category: computeCategoryOptions(feed),
                }
            case EVENT:
                return {
                    timeline: timelineOptions,
                    tag: computeTagsOptions(feed),
                }
            default:
                throw new Error(
                    `Type "${
                        type
                    }" not recognized for creating feed filtering options.`
                )
        }
    }
)

const getFilteredFeed = createSelector(
    getTransformedFeed,
    getPredicates,
    (feed, predicates) =>
        predicates.reduce((feed, predicate) => feed.filter(predicate), feed)
)

const getMessages = createSelector(getType, type => ({
    isLoading: `Loading ${type} feed...`,
    isError: `An error happened while loading the ${type} feed.`,
}))

const getStatus = createSelector(
    getType,
    (state, props) => getResult(state, props.params),
    getFilteredFeed,
    getMessages,
    (type, result, feed, messages) => {
        if (result.isLoaded && feed.isEmpty()) {
            messages.isLoaded = `No ${type} match your criteria.`
        }

        return result.asStatus(messages)
    }
)

export default createStructuredSelector({
    content: getFilteredFeed,
    status: getStatus,
    options: getFeedOptions,
})

export const getSidebar = createStructuredSelector({
    documents: createSelector(
        getDocumentsFromResult,
        getType,
        (state, props) => document => document.uid !== props.uid,
        (documents, type, filter) =>
            documents
                .filter(filter)
                .map(document => parse(document))
                .sort(SORTERS.get(type))
    ),
})

const getSplashMessages = createSelector(getType, type => ({
    isLoading: `Loading latest ${type}...`,
}))

export const getSplash = createSelector(
    getDocumentsFromResult,
    getStatusFactory(getSplashMessages),
    (documents, status) => {
        const featured = documents.find(isFeatured) || documents[0]

        if (featured) {
            delete featured.preview
        }

        return {
            featured,
            documents: documents.filter(document => document !== featured),
            status,
        }
    }
)
