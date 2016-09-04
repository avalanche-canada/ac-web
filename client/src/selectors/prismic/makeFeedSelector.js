import {createSelector} from 'reselect'
import {getDocumentsOfType, getIsFetching} from 'reducers/prismic'
import months from './months'

const {keys} = Object

const PREDICATES = new Map([
    ['year', ({year}) => post => post.year == year],
    ['month', ({month}) => post => post.month === months.indexOf(month) - 1],
    ['category', ({category}) => post => post.category == category],
    ['tags', ({tags}) => post => Boolean(post.tags.find(tag => tags.includes(tag)))],
])

function getPredicates(state, {location}) {
    const {query} = location

    return keys(query).map(key => PREDICATES.get(key).call(null, query))
}

export default function makeFeedSelector(type, transform, makeOptionsSelectors) {
    const getTransformedFeed = createSelector(
        state => getDocumentsOfType(state, type),
        feed => feed.map(transform)
    )

    return createSelector(
        getTransformedFeed,
        getIsFetching,
        getPredicates,
        makeOptionsSelectors(getTransformedFeed),
        function computeFeedProps(feed, isFetching, predicates, options) {
            const content = predicates.reduce((feed, predicate) => feed.filter(predicate), feed)
            let message = null

            if (isFetching) {
                message = `Loading ${type} feed...`
            } else if (content.size === 0) {
                message = `No ${type} found.`
            }

            return {
                content,
                message,
                ...options,
            }
        }
    )
}
