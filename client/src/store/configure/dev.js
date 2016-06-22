import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {Iterable} from 'immutable'
// import api from '../middleware/api'
import reducer from 'reducers'
// import DevTools from '../containers/DevTools'

export default function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, /*api, */createLogger({
          stateTransformer(state) {
            let newState = {}

            for (var key of Object.keys(state)) {
                if (Iterable.isIterable(state[key])) {
                    newState[key] = state[key].toJS()
                } else {
                    newState[key] = state[key]
                }
            }

            return newState
          }
      })),
    //   DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
