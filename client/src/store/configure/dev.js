import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {Iterable} from 'immutable'
import promise from 'redux-promise-middleware'
import reducer from '/reducers'
// import DevTools from '../containers/DevTools'

function configureStore(preloadedState) {
  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, promise(), createLogger({
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

export default configureStore
