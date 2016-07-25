import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import prismic from 'middleware/prismic'
import api from 'middleware/api'
import reducer from '../../reducers'

export default function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk, api, prismic)
  )
}
