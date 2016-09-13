import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Loop, { TYPES} from './Loop'

const stories = storiesOf('Weather Loops')

TYPES.forEach(type => {
    stories.add(type, () => (
        <Loop type={type} />
    ))
})
