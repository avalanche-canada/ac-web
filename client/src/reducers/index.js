import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import entities from './entities'

export default combineReducers({
    routing,
    entities,
})
