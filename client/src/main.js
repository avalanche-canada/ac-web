import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {computeRouter} from 'router'
import {configure, serializeFactory, deserialize} from 'store'
import configureRaven from 'services/raven'
import throttle from 'lodash/throttle'

import 'normalize.css'
import 'react-image-gallery/styles/css/image-gallery.css'

import 'styles/scaffolding.css'
import 'styles/prismic.css'
import 'styles/map.css'
// import 'styles/index.css'

configureRaven()

const store = configure(deserialize())

store.subscribe(throttle(serializeFactory(store), 1000))

const element = document.getElementById('app')

const application = (
    <Provider store={store}>
        {computeRouter(store)}
    </Provider>
)

ReactDOM.render(application, element)
