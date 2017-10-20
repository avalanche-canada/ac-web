import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { Iterable } from 'immutable'
import promise from 'redux-promise-middleware'
import reducer from 'reducers'

export default function configureStore(preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        compose(
            applyMiddleware(
                thunk,
                promise(),
                createLogger({
                    collapsed: true,
                    stateTransformer(state) {
                        let newState = {}

                        for (var key of Object.keys(state)) {
                            if (Iterable.isIterable(state[key])) {
                                newState[key] = state[key].toJSON()
                            } else {
                                newState[key] = state[key]
                            }
                        }

                        return newState
                    },
                })
            )
        )
    )
}
