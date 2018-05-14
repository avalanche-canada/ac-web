import React from 'react'
import { withState } from 'recompose'
import { storiesOf, action } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import Pagination from './index'

const Controlled = withState('active', 'onSelect', props => props.active || 0)(
    Pagination
)

const stories = storiesOf('Pagination', module)

stories.addDecorator(withKnobs)

const options = {
    range: true,
    min: 0,
    max: 100,
    step: 1,
}

stories.add('Pagination', () => {
    const total = number('Total pages', 10, options)
    const handleSelect = action('onSelect')

    return <Pagination total={total} onSelect={handleSelect} />
})
stories.add('Controlled', () => {
    return <Controlled total={10} active={4} />
})
