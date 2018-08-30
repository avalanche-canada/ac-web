import { combineReducers } from 'redux'
import prismic from './prismic'
import map from './map'
import api from './api'
import drawers from './drawers'

export default combineReducers({
    api,
    prismic,
    map,
    drawers,
})
