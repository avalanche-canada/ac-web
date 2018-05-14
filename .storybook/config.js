import { configure } from '@storybook/react'

function loadStories() {
    require('../client/components/button/stories.js')
    // You can require as many stories as you need.
}

configure(loadStories, module)

// import {configure, setAddon} from '@kadira/storybook'
// import infoAddon from '@kadira/react-storybook-addon-info'
//
// import '../client/styles'
//
// const req = require.context('../client', true, /stories.js$/)
//
// function loadStories() {
//     req.keys().forEach(req)
// }
//
// setAddon(infoAddon)
//
// configure(loadStories, module)
