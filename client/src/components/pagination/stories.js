import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Pagination, Left, Right } from './index'

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
