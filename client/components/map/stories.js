import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { compose, lifecycle, withState } from 'recompose'
import { Map, Source, Layer } from './index'
import { address, company } from 'faker'

const stories = storiesOf('Map', module)

stories.addWithInfo('Basic map', () => {
    return <Map />
})
