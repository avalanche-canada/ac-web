import {combineReducers} from 'redux'
import entities from './entities'
import prismic from './prismic'
import map from './map'

export default combineReducers({
    entities,
    prismic,
    map,
})
