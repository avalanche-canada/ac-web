import {combineReducers} from 'redux'
import entities from './entities'
import prismic from './prismic'

export default combineReducers({
    entities,
    prismic,
})
