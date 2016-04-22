import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { Sidebar, Header, Item } from './index'
import Link from '../navbar/Link'

storiesOf('Sidebar')
.add('Sidebar', () => (
    <Sidebar>
        <Header>Latest</Header>
        <Item>
            <Link to='#'>
                Blog Post #1
            </Link>
        </Item>
        <Item>
            <Link to='#'>
                Blog Post #2
            </Link>
        </Item>
    </Sidebar>
))
.add('Sidebar w/o social', () => (
    <Sidebar noSocial>
        <Header>Latest</Header>
        <Item>
            <Link to='#'>
                Blog Post #1
            </Link>
        </Item>
        <Item>
            <Link to='#'>
                Blog Post #2
            </Link>
        </Item>
    </Sidebar>
))
