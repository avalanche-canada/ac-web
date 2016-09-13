import { configure } from '@kadira/storybook'
import ElementQueries from 'css-element-queries/src/ElementQueries'

// TODO: Need to put these imports in a better spot
import 'normalize.css'
import '../client/src/styles/scaffolding.css'
import '../client/src/styles/prismic.css'

const req = require.context('../client/src', true, /stories.js$/)

function loadStories() {
    req.keys().forEach(req)
    ElementQueries.listen()
    ElementQueries.init()
}

configure(loadStories, module)
