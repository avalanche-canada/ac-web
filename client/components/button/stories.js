import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import {
    withKnobs,
    number,
    boolean,
    text,
    select,
} from '@kadira/storybook-addon-knobs'
import Button, {
    Expand,
    Sorting,
    Close,
    Locate,
    SECONDARY,
    PRIMARY,
    TERTIARY,
    INCOGNITO,
} from './index'
import KIND, { ALL as KINDS } from './kinds'

const stories = storiesOf('Button', module)

stories.addDecorator(withKnobs)

stories.addWithInfo('Button', () => {
    const handleClick = action('clicked')
    const kind = select('Kind', Array.from(KINDS), KIND)
    const shadow = boolean('Shadow', false)
    const large = boolean('Large', false)
    const transparent = boolean('Transparent', false)
    const chevron = select('Chevron', ['LEFT', 'RIGHT', true])

    return (
        <Button
            onClick={handleClick}
            kind={kind}
            chevron={chevron}
            shadow={shadow}
            large={large}
            transparent={transparent}>
            Button
        </Button>
    )
})

stories.add('Expand', () => <Expand />)
stories.add('Sorting', () => <Sorting />)
stories.add('Close', () => <Close />)
stories.add('Locate', () => <Locate />)
stories.add('Button w/ default chevron', () => (
    <Button chevron>
        Create report
    </Button>
))
