import {combineReducers} from 'redux'
import prismic from './prismic'
import map from './map'
import api from './api/index'
import drawers from './drawers'
import geolocation from './geolocation'
import auth from './auth'

export default combineReducers({
    api,
    prismic,
    map,
    drawers,
    geolocation,
    auth,
})
