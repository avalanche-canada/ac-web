import {createSelector, createStructuredSelector} from 'reselect'
import {getDocumentsOfType, getResult} from '~/getters/prismic'
import months, {options as monthOptions} from './months'
import transform from '~/prismic/transformers'
import computeYearOptions from './computeYearOptions'
import computeCategoryOptions from './computeCategoryOptions'
import computeTagsOptions from './computeTagsOptions'
import {getType, getStatusFactory, getDocumentsFromResult} from '~/selectors/prismic/utils'
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
    ['year', ({year}) => post => post.year == year], // == works with strings and numbers
    ['month', ({month}) => post => post.month === months.indexOf(month) - 1],
    ['category', ({category}) => post => post.category == category],
    ['tags', ({tags}) => post => Boolean(post.tags.find(tag => tags.has(tag)))],
    ['timeline', ({timeline}) => ({endDate}) => {
        const isPast = isBefore(endDate, startOfDay(new Date()))

        return timeline === PAST ? isPast : !isPast
    }],
])

function desc(a, b) {
    return b.date - a.date
}

const SORTERS = new Map([
    [NEWS, desc],
    [BLOG, desc],
    [EVENT, desc],
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

function getFeed(state, {type}) {
    return getDocumentsOfType(state, type)
}

const getTransformedFeed = createSelector(
    getFeed,
    getType,
    (feed, type) => {
        const sorted = feed.map(document => transform(document)).toList().sort(SORTERS.get(type))

        if (sorted.isEmpty()) {
            return sorted
        }

        const featured = sorted.find(isFeatured)
        const index = sorted.indexOf(featured)

        return sorted.remove(index).unshift(featured)
    }
)

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
            throw new Error(`Type "${type}" not recognized for creating feed filtering options.`)
        }
    },
)

const getFilteredFeed = createSelector(
    getTransformedFeed,
    getPredicates,
    (feed, predicates) => {
        if (predicates.length === 0) {
            return feed
        }

        return predicates.reduce((feed, predicate) => feed.filter(predicate), feed)
    }
)

const getMessages = createSelector(
    getType,
    type => ({
        isLoading: `Loading ${type} feed...`,
        isError: `An error happened while loading the ${type} feed.`,
    })
)

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
        (state, props) => document => document.uid !== props.uid,
        (documents, filter) => documents.filter(filter)
    )
})

const getSplashMessages = createSelector(
    getType,
    type => ({
        isLoading: `Loading latest ${type}...`
    })
)

export const getSplash = createSelector(
    getDocumentsFromResult,
    getStatusFactory(getSplashMessages),
    (documents, status) => {
        function isFeatured(post) {
            return post.featured
        }
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
