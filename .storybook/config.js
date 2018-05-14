import { configure } from '@storybook/react'
import '../client/styles'

const req = require.context('../client', true, /stories.js$/)

function loadStories() {
    req.keys().forEach(req)
}

configure(loadStories, module)
