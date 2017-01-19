import {createSelector, createStructuredSelector} from 'reselect'
import {getDocumentsOfType} from 'getters/prismic'
import months, {options as monthOptions} from './months'
import transform from './transform'
import computeYearOptions from './computeYearOptions'
import computeCategoryOptions from './computeCategoryOptions'
import computeTagsOptions from './computeTagsOptions'

const NEWS = 'news'
const BLOG = 'blog'
const EVENT = 'event'

const timelineOptions = new Map([
    ['past', 'Past events'],
    ['upcoming', 'Upcoming events'],
])

const now = new Date()
function isFeatured(post) {
    return post.featured
}

const PREDICATES = new Map([
    ['year', ({year}) => post => post.year == year], // == works with strings and numbers
    ['month', ({month}) => post => post.month === months.indexOf(month) - 1],
    ['category', ({category}) => post => post.category == category],
    ['tags', ({tags}) => post => Boolean(post.tags.find(tag => tags.has(tag)))],
    ['timeline', ({timeline}) => ({endDate}) => timeline === 'past' ? endDate < now : endDate >= now],
])

function asc(a, b) {
    return a.date - b.date
}
function desc(a, b) {
    return b.date - a.date
}

const SORTERS = new Map([
    [NEWS, desc],
    [BLOG, desc],
    [EVENT, asc],
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

function getType(state, {type}) {
    return type
}

function getFeed(state, {type}) {
    return getDocumentsOfType(state, type)
}

const getTransformedFeed = createSelector(
    getFeed,
    getType,
    (feed, type) => {
        const sorted = feed.map(transform).toList().sort(SORTERS.get(type))

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

const getStatus = createSelector(
    getType,
    getFilteredFeed,
    (state, props) => props.status,
    (type, feed, status) => {
        const messages = {
            isLoading: `Loading ${type} feed...`,
            isError: `An error happened while loading the ${type} feed.`,
        }

        if (status.isLoaded && feed.isEmpty()) {
            messages.isLoaded = `No ${type} match your criteria.`
        }

        return status.set('messages', messages)
    }
)

export default createStructuredSelector({
    content: getFilteredFeed,
    status: getStatus,
    options: getFeedOptions,
})
