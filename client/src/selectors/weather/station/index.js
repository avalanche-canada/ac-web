import {List} from 'immutable'
import {createSelector} from 'reselect'
import {WeatherStation} from 'api/schemas'
import {getEntitiesForSchema, getEntityForSchema} from 'reducers/api/entities'
import {getResultsSet} from 'reducers/api/getters'
import * as Columns from './columns'
import * as Headers from './headers'
import moment from 'moment'

const {assign} = Object

function transform({measurementDateTime, ...rest}) {
    return {
        ...rest,
        measurementDateTime: moment(measurementDateTime).toDate(),
    }
}

function getWeatherStation(state, {params, id}) {
    // For panel or page
    id = id || params.id

    return getEntityForSchema(state, WeatherStation, id)
}

function getWeatherStationResultsSet(state, {params}) {
    return getResultsSet(state, WeatherStation, params)
}

export default createSelector(
    getWeatherStation,
    getWeatherStationResultsSet,
    (station, {isFetching, isError, isLoaded}) => {
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

            if (station.has('measurements')) {
                const measurements = station.get('measurements')
                                            .map(measurement => transform(measurement.toJSON()))
                                            .sortBy(measurement => measurement.measurementDateTime)
                                            .reverse()
                assign(data, {
                    measurements,
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
                        Headers.SnowHeight,
                        Headers.AirTemperature,
                        Headers.Wind,
                        Headers.RelativeHumidity,
                    ], [
                        Headers.AirTemperatureAvg,
                        Headers.AirTemperatureMax,
                        Headers.AirTemperatureMin,
                        Headers.WindSpeedAvg,
                        Headers.WindDirectionAvg,
                        Headers.WindSpeedGust,
                    ]],
                })
            }
        }

        return data
    }
)
