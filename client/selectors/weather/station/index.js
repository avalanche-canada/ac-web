import { createSelector, createStructuredSelector } from 'reselect'
import { WeatherStation } from 'api/schemas'
import { getEntityForSchema } from 'getters/entities'
import { getResultsSet } from 'getters/api'
import * as Columns from './columns'
import * as Headers from './headers'
import { computeOffset } from 'selectors/map/bounds'
import Status from 'utils/status'

function getWeatherStationRaw(state, { id }) {
    return getEntityForSchema(state, WeatherStation, id)
}

const messages = {
    isError: 'Oups!! An error happened while loading weather station data.',
    isLoading: 'Loading weather station data...',
}

const getStatus = createSelector(
    (state, { id }) => getResultsSet(state, WeatherStation, { id }),
    result => Status.createFromResultSet(result, messages)
)

const getComputeFlyTo = createSelector(
    getWeatherStationRaw,
    computeOffset,
    (station, computeOffset) => () => ({
        center: [station.get('longitude'), station.get('latitude')],
        zoom: 14,
        offset: computeOffset(),
    })
)

function computeMeasurements(station) {
    if (!station.has('measurements')) {
        return
    }

    const utcOffset = station.get('utcOffset')

    return station
        .get('measurements')
        .map(m =>
            m.merge({
                measurementDateTime: new Date(m.get('measurementDateTime')),
                utcOffset,
            })
        )
        .sortBy(m => m.get('measurementDateTime'))
        .map((m, i, all) => {
            const newSnow =
                m.get('snowHeight') - all.getIn([i - 1, 'snowHeight'], NaN)

            return m.set('newSnow', newSnow < 0.5 ? 0 : Math.round(newSnow))
        })
        .map(m => m.toObject())
        .reverse()
}

const getMeasurements = createSelector(
    getWeatherStationRaw,
    station => station && computeMeasurements(station)
)

const getWeatherStation = createSelector(
    getWeatherStationRaw,
    station => station && station.toJSON()
)

const HEADERS = [
    [
        Headers.Snow,
        Headers.AirTemperature,
        Headers.Wind,
        Headers.RelativeHumidity,
    ],
    [
        Headers.SnowHeight,
        Headers.NewSnow,
        Headers.AirTemperatureAvg,
        Headers.WindSpeedAvg,
        Headers.WindDirectionAvg,
        Headers.WindSpeedGust,
    ],
]

const COLUMNS = [
    Columns.Hour,
    Columns.SnowHeight,
    Columns.NewSnow,
    Columns.AirTemperatureAvg,
    Columns.WindSpeedAvg,
    Columns.WindDirectionAvg,
    Columns.WindSpeedGust,
    Columns.RelativeHumidity,
]

const getTitle = createSelector(
    getWeatherStationRaw,
    station => station && station.get('name')
)

const getLink = createSelector(
    getWeatherStationRaw,
    station => station && `/weather/stations/${station.get('stationId')}`
)

export default createStructuredSelector({
    title: getTitle,
    link: getLink,
    status: getStatus,
    station: getWeatherStation,
    computeFlyTo: getComputeFlyTo,
    measurements: getMeasurements,
    columns: () => COLUMNS,
    headers: () => HEADERS,
})
