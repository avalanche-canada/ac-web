import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {computeRouter} from './router'
import {configure} from './store'

// TODO: Need to put these imports in a better spot
// There should be a vendor.css
import 'normalize.css'
import './styles/scaffolding.css'
import './styles/prismic.css'
import 'leaflet/dist/leaflet.css'

const store = configure()
const element = document.getElementById('app')

const application = (
    <Provider store={store}>
        {computeRouter(store)}
    </Provider>
)

ReactDOM.render(application, element)
