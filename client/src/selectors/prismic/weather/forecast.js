import {createSelector, createStructuredSelector} from 'reselect'
import {getWeatherForecast} from 'getters/prismic'
import Parser from 'prismic/parser'
import {formatDate} from 'utils/date'

const getForecast = createSelector(
    (state, props) => getWeatherForecast(state, props.date, true),
    document => document ? Parser.parse(document) : null
)

const getMessages = createSelector(
    (state, props) => props.date,
    date => ({
        isLoading: `Loading weather forecast for ${formatDate(date)}...`,
        isError: `Error happened to load weather forecast for ${formatDate(date)}.`
    })
)

const getStatus = createSelector(
    (state, props) => props.status,
    getMessages,
    (status, messages) => status.set('messages', messages)
)

export default createStructuredSelector({
    status: getStatus,
    forecast: getForecast,
})
