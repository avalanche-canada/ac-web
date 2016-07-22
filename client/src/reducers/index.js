import {combineReducers} from 'redux'
import entities from './entities'
import prismic from './prismic'
import map from './map'
import drawers from './drawers'

export default combineReducers({
    entities,
    prismic,
    map,
    drawers,
})
