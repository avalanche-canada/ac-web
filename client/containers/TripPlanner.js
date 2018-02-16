import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ForecastRegion } from 'api/schemas'
import { loadFeaturesMetadata } from 'actions/entities'
import { getEntitiesForSchema } from 'getters/entities'
import Universal from 'components/Universal'

export default connect(
    createStructuredSelector({
        regions(state) {
            return getEntitiesForSchema(state, ForecastRegion)
        },
    }),
    dispatch => ({
        didMount() {
            dispatch(loadFeaturesMetadata())
        },
    })
)(Universal)
