import {combineReducers} from 'redux'
import Immutable from 'immutable'
import {handleAction} from 'redux-actions'
import {GET_FEATURES} from 'actions/mapbox'
import typeToReducer from 'type-to-reducer'

const Status = Immutable.Record({
    isLoading: false,
    isLoaded: false,
    isError: false,
})

export default combineReducers({
    features: typeToReducer({
        [GET_FEATURES]: {
            FULFILLED(state, {payload, meta}) {
                return state.set(meta.id, payload.data)
            },
        }
    }, new Immutable.Map()),
    status: typeToReducer({
        [GET_FEATURES]: {
            PENDING(state, {meta}) {
                return state.set(meta.id, new Status({
                    isLoading: true
                }))
            },
            REJECTED(state, {meta}) {
                return state.merge(meta.id, {
                    isLoading: false,
                    isError: true,
                })
            },
            FULFILLED(state, {meta}) {
                return state.withMutations(state => {
                    state.get(meta.id).merge({
                        isLoading: false,
                        isLoaded: true,
                    })
                })
            },
        }
    }, new Immutable.Map()),
})
