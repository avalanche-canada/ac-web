import {normalize, arrayOf} from 'normalizr'
import * as Schemas from 'api/schemas'
import {createApiAction} from 'api/utils'

export const FORECAST_REQUEST = 'FORECAST_REQUEST'
export const FORECAST_SUCCESS = 'FORECAST_SUCCESS'
export const FORECAST_FAILURE = 'FORECAST_FAILURE'

export const FORECAST_REGIONS_REQUEST = 'FORECAST_REGIONS_REQUEST'
export const FORECAST_REGIONS_SUCCESS = 'FORECAST_REGIONS_SUCCESS'
export const FORECAST_REGIONS_FAILURE = 'FORECAST_REGIONS_FAILURE'

export const HOT_ZONE_AREAS_REQUEST = 'HOT_ZONE_AREAS_REQUEST'
export const HOT_ZONE_AREAS_SUCCESS = 'HOT_ZONE_AREAS_SUCCESS'
export const HOT_ZONE_AREAS_FAILURE = 'HOT_ZONE_AREAS_FAILURE'

export const HOT_ZONE_REPORT_REQUEST = 'HOT_ZONE_REPORT_REQUEST'
export const HOT_ZONE_REPORT_SUCCESS = 'HOT_ZONE_REPORT_SUCCESS'
export const HOT_ZONE_REPORT_FAILURE = 'HOT_ZONE_REPORT_FAILURE'

export const MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST = 'MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST'
export const MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS = 'MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS'
export const MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE = 'MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE'

export const INCIDENTS_REQUEST = 'INCIDENTS_REQUEST'
export const INCIDENTS_SUCCESS = 'INCIDENTS_SUCCESS'
export const INCIDENTS_FAILURE = 'INCIDENTS_FAILURE'

export const PROVIDERS_REQUEST = 'PROVIDERS_REQUEST'
export const PROVIDERS_SUCCESS = 'PROVIDERS_SUCCESS'
export const PROVIDERS_FAILURE = 'PROVIDERS_FAILURE'

export const COURSES_REQUEST = 'COURSES_REQUEST'
export const COURSES_SUCCESS = 'COURSES_SUCCESS'
export const COURSES_FAILURE = 'COURSES_FAILURE'

export const loadForecastRegions = createApiAction(
    Schemas.ForecastRegion,
    FORECAST_REGIONS_REQUEST,
    FORECAST_REGIONS_SUCCESS,
    FORECAST_REGIONS_FAILURE,
)

export const loadForecast = createApiAction(
    Schemas.Forecast,
    FORECAST_REQUEST,
    FORECAST_SUCCESS,
    FORECAST_FAILURE,
)

export const loadHotZoneAreas = createApiAction(
    Schemas.HotZoneArea,
    HOT_ZONE_AREAS_REQUEST,
    HOT_ZONE_AREAS_SUCCESS,
    HOT_ZONE_AREAS_FAILURE,
)

export const loadHotZoneReport = createApiAction(
    Schemas.HotZoneReport,
    HOT_ZONE_REPORT_REQUEST,
    HOT_ZONE_REPORT_SUCCESS,
    HOT_ZONE_REPORT_FAILURE,
)

const loadMountainInformationNetworkObservations = createApiAction(
    Schemas.MountainInformationNetworkObservation,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE,
)

export function loadMountainInformationNetworkObservationsForDays(days = 7) {
    return loadMountainInformationNetworkObservations({days})
}

export const loadIncidents = createApiAction(
    Schemas.Incident,
    INCIDENTS_REQUEST,
    INCIDENTS_SUCCESS,
    INCIDENTS_FAILURE,
)

export function loadStaticIncidents(params) {
    return dispatch => {
        function incident() {
            return {
                id: String(Math.random() * 1000000000),
                slug: 'renshaw-spirit-lake',
                date: '2016-01-29',
                description: 'Several groups of snowmobilers were impacted by a very large avalanche, burying up to 15 people. Five fatalities ensued.',
                location: 'Renshaw Spirit Lake',
                locationDescription: '20 km east of McBride',
                mountainRange: 'Rocky Mountains',
                province: 'BC',
                coordinates: '53.5481 -120.013 Lat/Long Decimal Degrees',
                elevation: 2050,
                activity: 'Snowmobiling',
                involvement: 15,
                injury: null,
                fatality: 5,
                avalanches: [{
                    date: '2016-01-29',
                    size: 3,
                    type: 'Slab',
                    trigger: 'Ma',
                    elevation: 2050,
                    aspect: 'NE',
                    slabWidth: 550,
                    slabThickness: 0.65,
                }],
                weather: {
                    presentTemperature: null,
                    maxTemperature: null,
                    minTemperature: null,
                    '24hrTrend': null,
                    windSpeed: null,
                    windDirection: null,
                    skyCondition: null,
                    precipitationTypeIntensity: null,
                    comment: 'A warm, windy storm occurred the previous 24 hours with significant precipitation followed by clearing and cooling on the day of the incident.',
                },
                snowpack: {
                    snowpack: 1.75,
                    '24hrSnow': null,
                    stormSnow: null,
                    stormDate: null,
                    comment: null,
                },
                documents: [{
                    date: '2016-01-30',
                    title: 'Outlined overview of incident site',
                    url: 'http://old.avalanche.ca/cac/bulletins/incident-reports/document/f1e911ae-4351-4f39-ab2e-896c7cef7aac',
                    download: 'outlined.jpg',
                }]
            }
        }
        const payload = {
            pages: 1,
            incidents: [incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident(), incident()]
        }

        dispatch({
            type: INCIDENTS_SUCCESS,
            payload: {
                ...normalize(payload.incidents, arrayOf(Schemas.Incident)),
                pages: payload.pages,
            },
            meta: {params},
        })
    }
}

export const loadProviders = createApiAction(
    Schemas.Provider,
    PROVIDERS_REQUEST,
    PROVIDERS_SUCCESS,
    PROVIDERS_FAILURE,
)

export const loadCourses = createApiAction(
    Schemas.Course,
    COURSES_REQUEST,
    COURSES_SUCCESS,
    COURSES_FAILURE,
)
