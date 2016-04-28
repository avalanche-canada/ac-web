import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Pagination, Left, Right, Center } from './index'

storiesOf('Pagination', module)
.add('Pagination', () => (
    <Pagination>
        <Left onNavigate={action('onPrevious')}>
            Previous blog post
        </Left>
        <Right onNavigate={action('onNext')}>
            Previous blog post
        </Right>
    </Pagination>
))
.add('Pagination w/ center', () => (
    <Pagination>
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
    </Pagination>
))
