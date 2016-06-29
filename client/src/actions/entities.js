import {createAction} from 'redux-actions'
import * as Schemas from 'api/schemas'
import {API} from 'middleware/api'

const FORECAST_REGIONS_REQUEST = 'FORECAST_REGIONS_REQUEST'
const FORECAST_REGIONS_SUCCESS = 'FORECAST_REGIONS_SUCCESS'
const FORECAST_REGIONS_FAILURE = 'FORECAST_REGIONS_FAILURE'

function createApiAction(schema, ...types) {
    return createAction(API, () => ({
        schema,
        types
    }))
}

export const loadForecastRegions = createApiAction(
    Schemas.ForecastRegion,
    FORECAST_REGIONS_REQUEST, FORECAST_REGIONS_SUCCESS, FORECAST_REGIONS_FAILURE
)
