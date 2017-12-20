import Container from './Container'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Forecast, ForecastRegion } from 'api/schemas'
import { loadFeaturesMetadata, loadForecast } from 'actions/entities'
import { getResultsSet } from 'getters/api'
import { getEntitiesForSchema, getEntityForSchema } from 'getters/entities'

export default connect(
    createStructuredSelector({
        data: createStructuredSelector({
            forecast: createSelector(getForecasts, getForecastId, findForecast),
            region(state, { name }) {
                return getEntityForSchema(state, ForecastRegion, name)
            },
            status(state, props) {
                const result = getResultsSet(state, Forecast, toParams(props))

                return result.asStatus(createMessages(props)).toObject()
            },
        }),
    }),
    (dispatch, { name, date }) => ({
        load() {
            dispatch(loadForecast({ name, date }))
            dispatch(loadFeaturesMetadata())
        },
    })
)(Container)

// Utils
function createMessages({ name }) {
    return {
        isLoading: `Loading ${name} avalanche bulletin...`,
        isError: `Error happened while loading ${name} avalanche bulletin.`,
    }
}
function getForecasts(state) {
    return getEntitiesForSchema(state, Forecast)
}
function getForecastId(state, props) {
    const { ids } = getResultsSet(state, Forecast, toParams(props))

    return ids.values().next().value
}
function findForecast(forecasts, id) {
    return forecasts.get(id)
}
function toParams({ name, date }) {
    return { name, date }
}
