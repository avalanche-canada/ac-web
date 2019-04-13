import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select } from '@storybook/addon-knobs'
import { Danger, Info, Warning, Success } from './index'

const stories = storiesOf('Alert', module)

stories.addDecorator(withKnobs)

stories.add('Alert', () => {
    const type = select('Type', ['DANGER', 'INFO', 'WARNING', 'SUCCESS'])
    const Alert = Components.get(type)

    return (
        <Alert>
            Some alert content with a <a href="#">Link</a>.
        </Alert>
    )
})

const Components = new Map([
    ['DANGER', Danger],
    ['INFO', Info],
    ['WARNING', Warning],
    ['SUCCESS', Success],
])
