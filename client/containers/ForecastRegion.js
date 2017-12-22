import Connector from './Connector'
import { connect } from 'react-redux'
import { ForecastRegion } from 'api/schemas'
import { loadFeaturesMetadata } from 'actions/entities'
import { getEntityForSchema } from './selectors'

export default connect(getEntityForSchema(ForecastRegion), dispatch => ({
    didMount() {
        dispatch(loadFeaturesMetadata())
    },
}))(Connector)
