import Container from './Container'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { MountainInformationNetworkSubmission as Schema } from 'api/schemas'
import { getEntityForSchema } from 'getters/entities'
import { getResultsSet } from 'getters/api'
import { loadMountainInformationNetworkSubmission } from 'actions/entities'

export default connect(
    createStructuredSelector({
        data: createStructuredSelector({
            report(state, { id }) {
                return getEntityForSchema(state, Schema, id)
            },
            status(state, { id }) {
                return getResultsSet(state, Schema, { id })
                    .asStatus(MESSAGES)
                    .toObject()
            },
        }),
    }),
    (dispatch, props) => ({
        load() {
            return dispatch(loadMountainInformationNetworkSubmission(props.id))
        },
    })
)(Container)

const MESSAGES = {
    isError: 'Error happened while loading submission.',
    isLoading: 'Loading submission...',
}
