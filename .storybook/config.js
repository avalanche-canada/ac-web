import { configure } from '@kadira/storybook'

// TODO: Need to put these imports in a better spot
import 'normalize.css'
import '../client/src/styles/scaffolding.css'
import '../client/src/styles/prismic.css'

const req = require.context('../client/src', true, /stories.js$/)

function loadStories() {
    req.keys().forEach(req)
}

configure(loadStories, module)
