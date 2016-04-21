import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Sidebar, Header, Item } from './index'
import Link from '../navbar/Link'

storiesOf('Sidebar')
.add('Sidebar', () => (
    <Sidebar>
        <Header>Latest</Header>
    </Sidebar>
))
.add('Sidebar w/o social', () => (
    <Sidebar noSocial>
        <Header>Latest</Header>
    </Sidebar>
))
