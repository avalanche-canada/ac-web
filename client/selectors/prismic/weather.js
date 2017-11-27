import { createSelector, createStructuredSelector } from 'reselect'
import {
    getDocument,
    getDocumentFromResult,
    getStatusFactory,
} from 'selectors/prismic/utils'
import { getIsAuthenticated } from 'getters/auth'
import format from 'date-fns/format'
import { DATE } from 'utils/date'

export default createStructuredSelector({
    isAuthenticated: getIsAuthenticated,
})

export const getTutorial = createStructuredSelector({
    tutorial: getDocument,
    status: getStatusFactory({
        isLoading: 'Loading tutorial...',
        isError: 'Error happened while loading tutorial...',
    }),
})

const getForecastMessages = createSelector(
    (state, props) => props.date,
    date => ({
        isLoading: `Loading weather forecast for ${format(date, DATE)}...`,
        isError: `Error happened to load weather forecast for ${format(
            date,
            DATE
        )}.`,
    })
)

export const getForecast = createStructuredSelector({
    status: getStatusFactory(getForecastMessages),
    forecast: getDocumentFromResult,
})
