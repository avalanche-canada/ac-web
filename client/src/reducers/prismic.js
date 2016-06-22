import {createSelector} from 'reselect'
import moment from 'moment'
import Immutable from 'immutable'
import Cursor from 'immutable/contrib/cursor'
import {history} from 'router'
import {PRISMIC_REQUEST, PRISMIC_SUCCESS, PRISMIC_FAILURE} from 'actions/prismic'

const TYPES = new Set([PRISMIC_REQUEST, PRISMIC_SUCCESS, PRISMIC_FAILURE])
const STATE = Immutable.fromJS({
    news: {
        isFetching: false,
        documents: null,
        error: null,
    },
    blog: {
        isFetching: false,
        documents: null,
        error: null,
    },
    events: {
        isFetching: false,
        documents: null,
        error: null,
    },
})

export default function prismic(state = STATE, action) {
    if (!TYPES.has(action.type)) {
        return state
    }

    const cursor = Cursor.from(
        state,
        action.meta.type,
        updates => state = updates
    )

    switch (action.type) {
        case PRISMIC_REQUEST:
            cursor.set('isFetching', true)
        case PRISMIC_SUCCESS:
        case PRISMIC_FAILURE:
            cursor.set('isFetching', false)
        case PRISMIC_SUCCESS:
            cursor.set('documents', action.payload)
    }

    return state
}

function getNewsState(state) {
    return state.prismic.get('news')
}

export function getNewsDocuments(state) {
    return getNewsState(state).get('documents')
}

function getFeedPredicates(state, props) {
    const {query} = props.location

    return Object.keys(query).map(key => (
        function predicate(object) {
            return object[key] == query[key]
        }
    ))
}

const getTransformedNewsDocuments = createSelector(
    getNewsDocuments,
    (news = null) => {
        if (news === null) {
            return null
        }

        return news.map(entry => {
            const date = entry.getDate('news.date')

            return {
                title: entry.getText('news.title'),
                headline: entry.getText('news.shortlede'),
                content: entry.asHtml('news.body'),
                name: entry.asHtml('news.slug'),
                tags: entry.tags,
                date,
                year: date.getFullYear(),
                month: date.getMonth(),
            }
        })
    }
)


const getYearOptions = createSelector(
    getTransformedNewsDocuments,
    function computeYearOptions(news) {
        const years = new Map([
            [null, 'All years']
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

            return [...set].reduce(reducer, years)
        }
    }
)

const getMonthOptions = createSelector(
    function computeMonthOptions() {
        const months = new Map([
            [null, 'All months']
        ])

        return moment.months().reduce((months, month, index) => (
            months.set(index, month)
        ), months)
    }
)

const getNewsFeedTags = createSelector(
    getTransformedNewsDocuments,
    function computeNewsFeedTags(news) {
        if (news === null) {
            return []
        }

        const tags = news.reduce((set, {tags}) => {
            tags.forEach(tag => set.add(tag.toLowerCase().trim()))

            return set
        }, new Set())

        return [...tags]
    }
)

export const getNewsFeed = createSelector(
    getTransformedNewsDocuments,
    getNewsState,
    getFeedPredicates,
    getYearOptions,
    getMonthOptions,
    getNewsFeedTags,
    function computeNewsFeed(news, state, predicates, yearOptions, monthOptions, tagOptions) {
        const newsFeed = {
            feed: [],
            yearOptions,
            monthOptions,
            tagOptions,
        }

        if (state.get('isFetching')) {
            Object.assign(newsFeed, {
                message: 'Loading news feed...'
            })
        }

        if (news !== null) {
            Object.assign(newsFeed, {
                feed: predicates.reduce((news, predicate) => news.filter(predicate), news),
            })
        }

        return newsFeed
    }
)
