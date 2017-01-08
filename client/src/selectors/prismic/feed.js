import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'getters/prismic'
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
    ['year', ({year}) => post => post.year == year], // Work with strings and numbers
    ['month', ({month}) => post => post.month === months.indexOf(month) - 1],
    ['category', ({category}) => post => post.category == category],
    ['tags', ({tags}) => post => Boolean(post.tags.find(tag => tags.includes(tag)))],
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

function getPredicates(state, {location}) {
    const {query} = location

    return Object.keys(query).map(key => PREDICATES.get(key).call(null, query))
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
                    monthOptions,
                    yearOptions: computeYearOptions(feed),
                    tagOptions: computeTagsOptions(feed),
                }
            case BLOG:
                return {
                    monthOptions,
                    yearOptions: computeYearOptions(feed),
                    categoryOptions: computeCategoryOptions(feed),
                }
            case EVENT:
                return {
                    timelineOptions,
                    tagOptions: computeTagsOptions(feed),
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

export default createSelector(
    getType,
    getFilteredFeed,
    getIsFetching,
    getFeedOptions,
    (type, feed, isLoading, options) => {
        let message = null

        if (isLoading) {
            message = `Loading ${type} feed...`
        } else if (feed.size === 0) {
            message = `No ${type} match your criteria.`
        }

        return {
            content: feed,
            message,
            ...options,
        }
    }
)
