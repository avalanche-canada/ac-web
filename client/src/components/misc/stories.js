import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Ribbon, BroughtBy, Avatar, Br } from './index'

storiesOf('Misc')
.add('Avatar', () => (
    <Avatar name='Karl Guillotte' url='//avatars1.githubusercontent.com/u/744011?v=3&s=40' />
))
.add('Avatar w/o image', () => (
    <Avatar name='Karl Guillotte' url='avatars1.githubusercontent.com/u/744011?v=3&s=40' />
))
.add('Ribbon', () => <Ribbon>Avalanche Canada</Ribbon>)
.add('Ribbon w/ custom caption', () => <Ribbon caption='custom caption'>Avalanche Canada</Ribbon>)
.add('BroughtBy', () => <BroughtBy></BroughtBy>)
.add('Br', () => <Br />)
