import React from 'react'
import {withState} from 'recompose'
import {storiesOf, action} from '@kadira/storybook'
import {Pagination, Left, Right, Center} from './index'

const Controlled = withState('active', 'onSelect', props => props.active || 0)(Pagination)

storiesOf('Pagination', module)
.add('Pagination #1', () => <Pagination pages={10} />)
.add('Pagination #2', () => <Controlled pages={10} active={4} first previous next last />)
