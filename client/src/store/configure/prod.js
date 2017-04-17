import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import reducer from '../../reducers'

export default function configureStore(preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(thunk, promise())
    )
}
