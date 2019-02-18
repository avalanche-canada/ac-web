import React, { useState } from 'react'
import { storiesOf, action } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'
import Pagination from './index'

function Controlled(props) {
    const [active, onSelect] = useState(props.active || 0)

    return <Pagination {...props} active={active} onSelect={onSelect} />
}

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
