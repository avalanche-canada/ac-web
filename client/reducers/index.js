import { combineReducers } from 'redux'
import map from './map'
import api from './api'
import drawers from './drawers'

export default combineReducers({
    api,
    map,
    drawers,
})
