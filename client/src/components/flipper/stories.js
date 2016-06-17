import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Flipper, Left, Right, Center } from './index'

storiesOf('Flipper', module)
.add('Flipper', () => (
    <Flipper>
        <Left onNavigate={action('onPrevious')}>
            Previous blog post
        </Left>
        <Right onNavigate={action('onNext')}>
            Previous blog post
        </Right>
    </Flipper>
))
.add('Flipper w/ center', () => (
    <Flipper>
        <Left onNavigate={action('onPrevious')}>
            Previous blog post
        </Left>
        <Center>
            <h3 style={{whiteSpace: 'nowrap'}}>
                Some information
            </h3>
        </Center>
        <Right onNavigate={action('onNext')}>
            Previous blog post
        </Right>
    </Flipper>
))
