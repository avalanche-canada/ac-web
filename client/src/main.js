import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {computeRouter} from 'router'
import {configure} from 'store'
import ElementQueries from 'css-element-queries/src/ElementQueries'

// TODO: Need to put these imports in a better spot
// There should be a vendor.css
import 'normalize.css'
import 'styles/scaffolding.css'
import 'styles/prismic.css'
import 'styles/auth0.css'

const store = configure()
const element = document.getElementById('app')

const application = (
    <Provider store={store}>
        {computeRouter(store)}
    </Provider>
)

function afterRender() {
    ElementQueries.listen()
}

ReactDOM.render(application, element, afterRender)
