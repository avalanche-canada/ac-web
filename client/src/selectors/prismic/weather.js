import {createSelector, createStructuredSelector} from 'reselect'
import {getDocument, getDocumentFromResult, getStatusFactory} from '~/selectors/prismic/utils'
import {getProfile, getIsAuthenticated} from 'getters/auth'
import Parser from '~/prismic/parser'
import format from 'date-fns/format'
import {DATE} from '~/utils/date'
import TABS, {DAY5TO7} from '~/components/weather/tabs'

export default createStructuredSelector({
    isAuthenticated: getIsAuthenticated
})

export const getTutorial = createStructuredSelector({
    tutorial: getDocument,
    status: getStatusFactory({
        isLoading: 'Loading tutorial...',
        isError: 'Error happened while loading tutorial...',
    }),
})

const isAvCanEmployeeEmail = /@avalanche.ca$/
const isCanadaEmployeeEmail = /@canada.ca$/

function canReadDay5To7Tab(email) {
    return isAvCanEmployeeEmail.test(email) || isCanadaEmployeeEmail.test(email)
}

const getTabs = createSelector(
    getProfile,
    getIsAuthenticated,
    (profile, isAuthenticated) => {
        if (isAuthenticated && profile) {
            const {email, email_verified} = profile

            if (email_verified && canReadDay5To7Tab(email)) {
                return [...TABS, DAY5TO7]
            }
        }

        return TABS
    }
)

const getForecastMessages = createSelector(
    (state, props) => props.date,
    date => ({
        isLoading: `Loading weather forecast for ${format(date, DATE)}...`,
        isError: `Error happened to load weather forecast for ${format(date, DATE)}.`
    })
)

export const getForecast = createStructuredSelector({
    status: getStatusFactory(getForecastMessages),
    forecast: getDocumentFromResult,
    tabs: getTabs,
})
