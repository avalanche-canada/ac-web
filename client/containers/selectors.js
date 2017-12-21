import { createStructuredSelector } from 'reselect'
import * as getters from 'getters/entities'
import { getResultsSet } from 'getters/api'

export function getDataForSchema(schema) {
    return createStructuredSelector({
        data(state) {
            return getters
                .getEntitiesForSchema(state, schema)
                .toList()
                .sortBy(item => item.get('name'))
        },
    })
}

export function getEntityForSchema(schema, messages) {
    return createStructuredSelector({
        data: createStructuredSelector({
            entity(state, { id }) {
                return getters.getEntityForSchema(state, schema, id)
            },
            status(state, { id }) {
                const result = getResultsSet(state, schema, { id })

                return result.asStatus(messages).toObject()
            },
        }),
    })
}
