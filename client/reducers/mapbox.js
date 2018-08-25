import { combineReducers } from 'redux'
import Immutable from 'immutable'
import { GET_FEATURES } from 'actions/mapbox'
import typeToReducer from 'type-to-reducer'
import Status from 'utils/status'

export default combineReducers({
    features: typeToReducer(
        {
            [GET_FEATURES]: {
                FULFILLED(state, { payload, meta }) {
                    return state.set(meta.id, payload)
                },
            },
        },
        new Immutable.Map()
    ),
    status: typeToReducer(
        {
            [GET_FEATURES]: {
                PENDING(state, { meta }) {
                    return state.set(
                        meta.id,
                        new Status({
                            isLoading: true,
                        })
                    )
                },
                REJECTED(state, { meta }) {
                    return state.update(meta.id, status => status.reject())
                },
                FULFILLED(state, { meta }) {
                    return state.update(meta.id, status => status.fulfill())
                },
            },
        },
        new Immutable.Map()
    ),
})
