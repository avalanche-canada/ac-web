import { connect } from 'react-redux'
import { ForecastRegion } from 'api/schemas'
import { loadFeaturesMetadata } from 'actions/entities'
import { getDataForSchema } from './api'
import Connector from './Connector'

export default connect(getDataForSchema(ForecastRegion), dispatch => ({
    didMount() {
        dispatch(loadFeaturesMetadata())
    },
}))(Connector)
