import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'
import {options as monthOptions} from './months'
import transform from './transform'
import computeYearOptions from './computeYearOptions'
import computeCategoryOptions from './computeCategoryOptions'
import computeTagsOptions from './computeTagsOptions'

const {keys} = Object

const PREDICATES = new Map([
    ['year', ({year}) => post => post.year == year],
    ['month', ({month}) => post => post.month === months.indexOf(month) - 1],
    ['category', ({category}) => post => post.category == category],
    ['tags', ({tags}) => post => Boolean(post.tags.find(tag => tags.includes(tag)))],
])

function sorter(post) {
    return post.date
}

function getPredicates(state, {location}) {
    const {query} = location

    return keys(query).map(key => PREDICATES.get(key).call(null, query))
}

function getType(state, {type}) {
    return type
}

function getFeed(state, {type}) {
    return getDocumentsOfType(state, type)
}

const getTransformedFeed = createSelector(
    getFeed,
    feed => feed.map(transform).toList().sortBy(sorter).reverse()
)

const getFeedOptions = createSelector(
    getTransformedFeed,
    getType,
    (feed, type) => {
        switch (type) {
            case 'news':
                return {
                    monthOptions,
                    yearOptions: computeYearOptions(feed),
                    tagOptions: computeTagsOptions(feed),
                }
            case 'blog':
                return {
                    monthOptions,
                    yearOptions: computeYearOptions(feed),
                    categoryOptions: computeCategoryOptions(feed),
                }
            case 'event':
                return {
                    monthOptions,
                    yearOptions: computeYearOptions(feed),
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
