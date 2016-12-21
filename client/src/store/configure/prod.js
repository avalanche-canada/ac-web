import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import prismic from 'middleware/prismic'
import entities from 'middleware/entities'
import metadata from 'middleware/metadata'
import post from 'middleware/post'
import raven from 'middleware/raven'
import reducer from '../../reducers'

export default function configureStore(preloadedState) {
  return createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk, entities, metadata, post, prismic, raven)
  )
}
