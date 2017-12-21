import { connect } from 'react-redux'
import { HotZone } from 'api/schemas'
import { loadFeaturesMetadata } from 'actions/entities'
import { getDataForSchema } from './api'
import Connector from './Connector'

export default connect(getDataForSchema(HotZone), dispatch => ({
    didMount() {
        dispatch(loadFeaturesMetadata())
    },
}))(Connector)
