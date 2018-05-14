import React from 'react'
import { storiesOf, action } from '@storybook/react'
import {
    withKnobs,
    number,
    boolean,
    text,
    select,
} from '@storybook/addon-knobs'
import Alert, { DANGER, INFO, WARNING, SUCCESS } from './index'

const stories = storiesOf('Alert', module)

stories.addDecorator(withKnobs)

stories.add('Alert', () => {
    const type = select('Type', [DANGER, INFO, WARNING, SUCCESS])

    return (
        <Alert type={type}>
            Some alert content with a <a href="#">Link</a>.
        </Alert>
    )
})
