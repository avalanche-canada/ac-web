import { configure } from '@kadira/storybook'
import 'normalize.css'
import '../client/src/styles/scaffolding.css'

const req = require.context('../client/src', true, /stories.js$/)

function loadStories() {
    req.keys().forEach(req)
}

configure(loadStories, module)
