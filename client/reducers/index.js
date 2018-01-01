import { combineReducers } from 'redux'
import prismic from './prismic'
import map from './map'
import api from './api'
import drawers from './drawers'
import auth from './auth'
import sponsors from './sponsors'
import mapbox from './mapbox'

export default combineReducers({
    api,
    prismic,
    map,
    drawers,
    auth,
    sponsors,
    mapbox,
})
