import Connector from './Connector'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { MountainConditionsReport as Schema } from 'api/schemas'
import { getEntityForSchema } from 'getters/entities'
import { getResultsSet } from 'getters/api'

export default connect(
    createStructuredSelector({
        data: createStructuredSelector({
            report(state, { id }) {
                return getEntityForSchema(state, Schema, id)
            },
            status(state) {
                return getResultsSet(state, Schema)
                    .asStatus()
                    .toObject()
            },
        }),
    })
    // TODO: For a fully proof container, we should provide a load function
    // We assume someone will load all MCRs. The map is currently loading all
    // MCR reports.
)(Connector)
