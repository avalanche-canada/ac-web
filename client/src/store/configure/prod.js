import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import prismic from 'middleware/prismic'
import api from 'middleware/api'
import post from 'middleware/post'
import raven from 'middleware/raven'
import reducer from '../../reducers'

export default function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk, api, post, prismic, raven)
  )
}
