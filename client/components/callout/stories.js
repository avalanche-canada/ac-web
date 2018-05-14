import React from 'react'
import { storiesOf, action } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import Callout, { TOP, BOTTOM, LEFT, RIGHT } from './Callout'

const stories = storiesOf('Callout', module)

stories.addDecorator(withKnobs)

stories.add('Callout', () => {
    const placement = select('Placement', [TOP, BOTTOM, LEFT, RIGHT])

    return (
        <Callout placement={placement}>
            Some content.
        </Callout>
    )
})
