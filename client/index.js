import '@babel/polyfill'
import 'raf/polyfill'
import 'url-search-params-polyfill'
import 'whatwg-fetch'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import configureRaven from 'services/raven'
import Router from 'router'
import * as Auth from 'contexts/auth'

import 'styles'

configureRaven()

const application = (
    <Auth.Provider>
        <Router />
    </Auth.Provider>
)

ReactDOM.render(application, document.getElementById('app'))
