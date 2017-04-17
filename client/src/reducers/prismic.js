import Immutable from 'immutable'
import {combineReducers} from 'redux'
import {GET_PRISMIC} from '~/actions/prismic'
import typeToReducer from 'type-to-reducer'
import RESULT from '~/reducers/result'

const SET = new Immutable.Set()
const MAP = new Immutable.Map()

export default combineReducers({
    documents: typeToReducer({
        [GET_PRISMIC]: {
            FULFILLED(state, action) {
                return state.withMutations(state => {
                    action.payload.results.forEach(document => {
                        state.set(document.id, document)
                    })
                })
            }
        }
    }, MAP),
    uids: typeToReducer({
        [GET_PRISMIC]: {
            FULFILLED(state, action) {
                return state.withMutations(state => {
                    action.payload.results.forEach(({type, uid, id}) => {
                        if (uid) {
                            const uids = state.get(type, MAP)

                            state.set(type, uids.set(uid, id))
                        }
                    })
                })
            }
        }
    }, MAP),
    ids: typeToReducer({
        [GET_PRISMIC]: {
            FULFILLED(state, action) {
                return state.withMutations(state => {
                    action.payload.results.forEach(({type, id}) => {
                        const ids = state.get(type, SET)

                        state.set(type, ids.add(id))
                    })
                })
            }
        }
    }, MAP),
    results: typeToReducer({
        [GET_PRISMIC]: {
            PENDING(state, {meta}) {
                return state.set(meta.key, RESULT.start())
            },
            REJECTED(state, {meta}) {
                return state.set(meta.key, RESULT.reject())
            },
            FULFILLED(state, {meta, payload}) {
                return state.set(meta.key, RESULT.fulfill({
                    ids: payload.results.map(pluckId)
                }))
            },
        }
    }, MAP)
})

function pluckId(document) {
    return document.id
}
