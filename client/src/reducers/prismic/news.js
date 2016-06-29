import moment from 'moment'
import {createSelector} from 'reselect'
import * as transformers from './transformers'
import {getDocumentsOfType, getIsFetching, getDocumentForUid} from './'

const predicates = new Map([
    ['month', query => post => post.month === months.indexOf(query.month)],
    ['year', query => post => post.year == query.year],
    ['tags', query => post => post.tags.includes(query.tags)],
])

function getFeedPredicates(state, props) {
    const {query} = props.location
    const keys = Object.keys(query)

    return keys.map(key => predicates.get(key).call(null, query))
}

const months = moment.months().map(month => month.toLowerCase())

const getTransformedNewsDocuments = createSelector(
    state => getDocumentsOfType(state, 'news') || [],
    news => news.map(transformers.newsPost)
)

const getYearOptions = createSelector(
    getTransformedNewsDocuments,
    function computeYearOptions(news) {
        const years = new Map([
            [undefined, 'Year']
        ])
        function reducer(years, year) {
            return years.set(year, String(year))
        }

        if (news === null) {
            const year = new Date().getFullYear()

            return Array(5).fill(null)
                .map((value, index) => year - index)
                .reduce(reducer, years)
        } else {
            const set = new Set(news.map(entry => entry.year))

            return [...set].sort().reverse().reduce(reducer, years)
        }
    }
)

const getMonthOptions = createSelector(
    function computeMonthOptions() {
        const months = new Map([
            [undefined, 'Month']
        ])

        return moment.months().reduce((months, month) => (
            months.set(month.toLowerCase(), month)
        ), months)
    }
)

const getNewsFeedTags = createSelector(
    getTransformedNewsDocuments,
    function computeNewsFeedTags(news) {
        const tags = new Map([
            [undefined, 'Tags']
        ])

        return news.reduce((map, {tags}) => (
            tags.reduce((map, tag) => map.set(tag.toLowerCase(), tag), map)
        ), tags)
    }
)

export const getNewsFeedProps = createSelector(
    getTransformedNewsDocuments,
    getIsFetching,
    getFeedPredicates,
    getYearOptions,
    getMonthOptions,
    getNewsFeedTags,
    function computeNewsFeedProps(news, isFetching, predicates, yearOptions, monthOptions, tagOptions) {
        const feed = predicates.reduce((news, predicate) => news.filter(predicate), news)

        return {
            feed,
            message: isFetching ? 'Loading news feed...' : null,
            yearOptions,
            monthOptions,
            tagOptions,
        }
    }
)

function getTransformedNewsDocument(state, props) {
    const {uid} = props.params
    const document = getDocumentForUid(state, 'news', uid)

    return document && transformers.newsPost(document)
}

export const getNewsPostProps = createSelector(
    getIsFetching,
    getTransformedNewsDocument,
    function computeNewsPostProps(isFetching, post) {
        if (isFetching && !post) {
            return {
                message: 'Loading your news post...'
            }
        }

        return {
            post
        }
    }
)
