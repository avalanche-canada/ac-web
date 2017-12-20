import { connect } from 'react-redux'
import { WeatherStation } from 'api/schemas'
import { loadWeatherStations as load } from 'actions/entities'
import Container from './Container'
import { getDataForSchema } from './api'

export default connect(
    getDataForSchema(WeatherStation, {
        isError: 'Oups!! An error happened while loading weather station data.',
        isLoading: 'Loading weather station data...',
    }),
    { load }
)(Container)

