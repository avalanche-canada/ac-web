import {List} from 'immutable'
import {createSelector} from 'reselect'
import {WeatherStation} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import * as Columns from './columns'
import * as Headers from './headers'

const {assign} = Object

function transform({transmissionDateTime, measurementDateTime, ...rest}) {
    return {
        ...rest,
        transmissionDateTime: new Date(transmissionDateTime),
        measurementDateTime: new Date(measurementDateTime),
    }
}

function getWeatherStation(state, {params}) {
    const id = 'C4000254'

    return getEntityForSchema(state, WeatherStation, id)
}

function getWeatherStationMeasurements() {
    return new List([{
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T14:19:01-07:00",
        measurementDateTime: "2016-10-21T14:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T15:19:01-07:00",
        measurementDateTime: "2016-10-21T15:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T16:19:01-07:00",
        measurementDateTime: "2016-10-21T16:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T17:19:01-07:00",
        measurementDateTime: "2016-10-21T17:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T18:19:01-07:00",
        measurementDateTime: "2016-10-21T18:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T19:19:01-07:00",
        measurementDateTime: "2016-10-21T19:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T20:19:01-07:00",
        measurementDateTime: "2016-10-21T20:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T21:19:01-07:00",
        measurementDateTime: "2016-10-21T21:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T22:19:01-07:00",
        measurementDateTime: "2016-10-21T22:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-21T23:19:01-07:00",
        measurementDateTime: "2016-10-21T23:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-22T00:19:01-07:00",
        measurementDateTime: "2016-10-22T00:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-22T01:19:01-07:00",
        measurementDateTime: "2016-10-22T01:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }, {
        stationId: "ABC0251E",
        transmissionDateTime: "2016-10-22T02:19:01-07:00",
        measurementDateTime: "2016-10-22T02:00:00-07:00",
        transmissionQuality: "G35",
        snowHeight: 23.9,
        airTempAvg: 2.3,
        airTempMax: 2.5,
        airTempMin: 1.6,
        windSpeedAvg: 3,
        windDirAvg: 326,
        windSpeedGust: 15,
        relativeHumidity: 47
    }])
}

function getWeatherStationResultsSet(state, {params}) {
    return getResultsSet(state, WeatherStation, params)
}

export default createSelector(
    getWeatherStation,
    getWeatherStationMeasurements,
    getWeatherStationResultsSet,
    (station, measurements, {isFetching, isError, isLoaded}) => {
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
        }

        if (station) {
            assign(data, {
                station: station.toJSON()
            })
        }

        if (measurements) {
            assign(data, {
                measurements: measurements.map(transform).sortBy(measurement => measurement.measurementDateTime).reverse(),
                columns: [
                    Columns.Hour,
                    Columns.SnowHeight,
                    Columns.AirTemperatureAvg,
                    Columns.AirTemperatureMax,
                    Columns.AirTemperatureMin,
                    Columns.WindSpeedAvg,
                    Columns.WindDirectionAvg,
                    Columns.WindSpeedGust,
                    Columns.RelativeHumidity,
                ],
                headers: [[
                    Headers.Hour,
                    Headers.Snow,
                    Headers.AirTemperature,
                    Headers.Wind,
                    Headers.RelativeHumidity,
                ], [
                    Headers.SnowHeight,
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
