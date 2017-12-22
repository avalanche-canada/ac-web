import Connector from './Connector'
import { connect } from 'react-redux'
import { WeatherStation } from 'api/schemas'
import { loadWeatherStation } from 'actions/entities'
import { getEntityForSchema } from './selectors'

export default connect(getEntityForSchema(WeatherStation), dispatch => ({
    didMount({ props }) {
        dispatch(loadWeatherStation(props.id))
    },
    willReceiveProps({ props, nextProps }) {
        if (props.id !== nextProps.id) {
            dispatch(loadWeatherStation(nextProps.id))
        }
    },
}))(Connector)
