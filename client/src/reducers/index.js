import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import prismic from './prismic'
import map from './map'
import api from './api/index'
import drawers from './drawers'

export default combineReducers({
    api,
    prismic,
    map,
    drawers,
    // routing,
})
