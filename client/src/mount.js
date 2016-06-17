import React from 'react'
import ReactDOM from 'react-dom'
import router from 'router'

// TODO: Need to put these imports in a better spot, copied from the storybook
import 'normalize.css'
import './styles/scaffolding.css'
import './styles/prismic.css'
import 'leaflet/dist/leaflet.css'

const app = document.createElement('div')

document.body.appendChild(app)

ReactDOM.render(router, app)
