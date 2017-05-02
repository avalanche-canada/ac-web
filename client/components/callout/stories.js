import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, select } from '@kadira/storybook-addon-knobs'
import Callout, { TOP, BOTTOM, LEFT, RIGHT } from './Callout'

const stories = storiesOf('Callout', module)

stories.addDecorator(withKnobs)

stories.addWithInfo('Callout', () => {
    const placement = select('Placement', [TOP, BOTTOM, LEFT, RIGHT])

    return (
        <Callout placement={placement}>
            Some content.
        </Callout>
    )
})
