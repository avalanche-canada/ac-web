import '@babel/polyfill'
import 'raf/polyfill'
import 'url-search-params-polyfill'
import 'whatwg-fetch'
import 'services/mapbox/map'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configure, serializeFactory, deserialize } from 'store'
import configureRaven from 'services/raven'
import throttle from 'lodash/throttle'
import Router from 'router'
import * as Auth from 'contexts/auth'

import 'styles'

configureRaven()

const store = configure(deserialize())

store.subscribe(throttle(serializeFactory(store), 1000))

const element = document.getElementById('app')

const application = (
    <Provider store={store}>
        <Auth.Provider>
            <Router />
        </Auth.Provider>
    </Provider>
)

ReactDOM.render(application, element)
