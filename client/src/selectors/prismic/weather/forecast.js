import {createSelector, createStructuredSelector} from 'reselect'
import {getWeatherForecast} from 'getters/prismic'
import {getProfile, getIsAuthenticated} from 'getters/auth'
import Parser from 'prismic/parser'
import format from 'date-fns/format'
import {DATE} from 'utils/date'
import TABS, {DAY5TO7} from 'components/weather/tabs'

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

const getForecast = createSelector(
    (state, props) => getWeatherForecast(state, props.date, true),
    document => document ? Parser.parse(document) : null
)

const getMessages = createSelector(
    (state, props) => props.date,
    date => ({
        isLoading: `Loading weather forecast for ${format(date, DATE)}...`,
        isError: `Error happened to load weather forecast for ${format(date, DATE)}.`
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
    tabs: getTabs,
})
