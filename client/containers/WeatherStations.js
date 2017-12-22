import Connector from './Connector'
import { connect } from 'react-redux'
import { WeatherStation } from 'api/schemas'
import { loadWeatherStations } from 'actions/entities'
import { getDataForSchema } from './selectors'

export default connect(
    getDataForSchema(WeatherStation, {
        isError: 'Oups!! An error happened while loading weather station data.',
        isLoading: 'Loading weather station data...',
    }),
    dispatch => ({
        didMount() {
            dispatch(loadWeatherStations())
        },
    })
)(Connector)
