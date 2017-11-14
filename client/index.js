import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configure, serializeFactory, deserialize } from 'store'
import configureRaven from 'services/raven'
import throttle from 'lodash/throttle'
import Router from 'router'

import 'styles'

configureRaven()

const store = configure(deserialize())

store.subscribe(throttle(serializeFactory(store), 1000))

const element = document.getElementById('app')

const application = (
    <Provider store={store}>
        <Router />
    </Provider>
)

ReactDOM.render(application, element)
