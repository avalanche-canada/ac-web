import React, { createElement } from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Container } from './index'
import { AC, ACF } from '../../constants/menu'

storiesOf('Menu', module)
.add('Avalanche Canada', () => <Container menu={AC} show />)
.add('Avalanche Canada Foundation', () => <Container menu={ACF} show isFondation />)
