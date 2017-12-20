import Container from './Container'
import { connect } from 'react-redux'
import { WeatherStation } from 'api/schemas'
import { loadWeatherStation } from 'actions/entities'
import { getEntityForSchema } from './api'

export default connect(
    getEntityForSchema(WeatherStation),
    (dispatch, { id }) => ({
        load() {
            return dispatch(loadWeatherStation(id))
        },
    })
)(Container)
