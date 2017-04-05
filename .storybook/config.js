import {configure, setAddon} from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'

import '../client/src/styles/index.css'

const req = require.context('../client/src', true, /stories.js$/)

function loadStories() {
    req.keys().forEach(req)
}

setAddon(infoAddon)

configure(loadStories, module)
