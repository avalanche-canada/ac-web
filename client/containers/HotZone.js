import Container from './Container'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { HotZone } from 'api/schemas'
import { loadFeaturesMetadata as load } from 'actions/entities'
import { getResultsSet } from 'getters/api'
import { getEntityForSchema } from 'getters/entities'

export default connect(
    createStructuredSelector({
        data: createStructuredSelector({
            hotZone(state, { id }) {
                return getEntityForSchema(state, HotZone, id)
            },
            status(state) {
                return getResultsSet(state, HotZone)
            },
        }),
    }),
    { load }
)(Container)
