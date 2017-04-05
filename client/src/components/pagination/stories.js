import React from 'react'
import {withState} from 'recompose'
import {storiesOf, action} from '@kadira/storybook'
import {withKnobs, number} from '@kadira/storybook-addon-knobs'
import Pagination from './index'

const Controlled = withState('active', 'onSelect', props => props.active || 0)(Pagination)

const stories = storiesOf('Pagination', module)

stories.addDecorator(withKnobs)

const options = {
   range: true,
   min: 0,
   max: 100,
   step: 1,
}

stories.addWithInfo('Pagination', () => (
    <Pagination total={number('Total', 10, options)} onSelect={action('onSelect')} />
))
stories.add('Controlled', () => (
    <Controlled total={10} active={4} />
))
