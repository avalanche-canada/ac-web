import Connector from './Connector'
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
                const result = getResultsSet(state, Schema, { id })

                return result.asStatus(MESSAGES).toObject()
            },
        }),
    }),
    dispatch => ({
        didMount({ props }) {
            dispatch(loadMountainInformationNetworkSubmission(props.id))
        },
        willReceiveProps({ props, nextProps }) {
            if (props.id !== nextProps.id) {
                dispatch(loadMountainInformationNetworkSubmission(nextProps.id))
            }
        },
    })
)(Connector)

const MESSAGES = {
    isError: 'Error happened while loading submission.',
    isLoading: 'Loading submission...',
}
