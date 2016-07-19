import {createAction} from 'redux-actions'
import * as Schemas from 'api/schemas'
import {API} from 'middleware/api'

export const FORECAST_REQUEST = 'FORECAST_REQUEST'
export const FORECAST_SUCCESS = 'FORECAST_SUCCESS'
export const FORECAST_FAILURE = 'FORECAST_FAILURE'

export const FORECAST_REGIONS_REQUEST = 'FORECAST_REGIONS_REQUEST'
export const FORECAST_REGIONS_SUCCESS = 'FORECAST_REGIONS_SUCCESS'
export const FORECAST_REGIONS_FAILURE = 'FORECAST_REGIONS_FAILURE'

export const HOT_ZONE_AREAS_REQUEST = 'HOT_ZONE_AREAS_REQUEST'
export const HOT_ZONE_AREAS_SUCCESS = 'HOT_ZONE_AREAS_SUCCESS'
export const HOT_ZONE_AREAS_FAILURE = 'HOT_ZONE_AREAS_FAILURE'

function createApiAction(schema, ...types) {
    return createAction(API, params => ({
        schema,
        params,
        types,
    }))
}

export const loadForecastRegions = createApiAction(
    Schemas.ForecastRegion,
    FORECAST_REGIONS_REQUEST, FORECAST_REGIONS_SUCCESS, FORECAST_REGIONS_FAILURE
)

export const loadForecast = createApiAction(
    Schemas.Forecast,
    FORECAST_REQUEST, FORECAST_SUCCESS, FORECAST_FAILURE
)

export const loadHotZoneAreas = createApiAction(
    Schemas.HotZoneArea,
    HOT_ZONE_AREAS_REQUEST, HOT_ZONE_AREAS_SUCCESS, HOT_ZONE_AREAS_FAILURE
)
