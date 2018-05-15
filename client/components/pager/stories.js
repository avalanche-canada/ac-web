import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import {withKnobs, number, boolean, text} from '@kadira/storybook-addon-knobs'
import Pager,{Previous,Next} from './Pager'

const stories = storiesOf('Pager', module)

stories.addDecorator(withKnobs)

stories.add('Pager', () => {
    return (
        <Pager>
            <Previous>
                A previous title
            </Previous>
            <Next>
                A next title
            </Next>
        </Pager>
    )
})
