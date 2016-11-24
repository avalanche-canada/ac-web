import {List} from 'immutable'
import moment from 'moment'
import {createSelector} from 'reselect'
import {WeatherStation} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import * as Columns from './columns'
import * as Headers from './headers'
import {computeOffset} from 'selectors/map/bounds'

function getWeatherStation(state, {params, id}) {
    // For panel or page
    id = id || params.id

    return getEntityForSchema(state, WeatherStation, id)
}

function getWeatherStationResultsSet(state, {params}) {
    return getResultsSet(state, WeatherStation, params)
}

const getComputeFlyTo = createSelector(
    getWeatherStation,
    computeOffset,
    (station, computeOffset) => () => ({
        center: [station.get('longitude'), station.get('latitude')],
        zoom: 12.5,
        offset: computeOffset(),
    })
)

function computeMeasurements(station) {
    if (!station.has('measurements')) {
        return
    }

    const utcOffset = station.get('utcOffset')

    return station.get('measurements')
        .map(m => m.merge({
            measurementDateTime: new Date(m.get('measurementDateTime')),
            utcOffset,
        }))
        .sortBy(m => m.get('measurementDateTime'))
        .map((m, i, all) => {
            const newSnow = m.get('snowHeight') - all.getIn([i - 1, 'snowHeight'], NaN)

            return m.set('newSnow', newSnow < 0.5 ? 0 : Math.round(newSnow))
        })
        .map(m => m.toObject())
        .reverse()
        .take(24)
}

export default createSelector(
    getWeatherStation,
    getWeatherStationResultsSet,
    getComputeFlyTo,
    (station, {isFetching, isError, isLoaded}, computeFlyTo) => {
        const data = {
            title: station && station.get('name'),
            link: station && `weather/stations/${station.get('stationId')}`,
            isFetching,
            isError,
            isLoaded,
            messages: {
                error: 'Oups!!',
                loading: 'Loading your data...'
            },
            computeFlyTo,
        }

        if (station) {
            Object.assign(data, {
                station: station.toJSON(),
                measurements: computeMeasurements(station),
                columns: [
                    Columns.Hour,
                    Columns.SnowHeight,
                    Columns.NewSnow,
                    Columns.AirTemperatureAvg,
                    Columns.AirTemperatureMax,
                    Columns.AirTemperatureMin,
                    Columns.WindSpeedAvg,
                    Columns.WindDirectionAvg,
                    Columns.WindSpeedGust,
                    Columns.RelativeHumidity,
                ],
                headers: [[
                    Headers.Snow,
                    Headers.AirTemperature,
                    Headers.Wind,
                    Headers.RelativeHumidity,
                ], [
                    Headers.SnowHeight,
                    Headers.NewSnow,
                    Headers.AirTemperatureAvg,
                    Headers.AirTemperatureMax,
                    Headers.AirTemperatureMin,
                    Headers.WindSpeedAvg,
                    Headers.WindDirectionAvg,
                    Headers.WindSpeedGust,
                ]],
            })
        }

        return data
    }
)
