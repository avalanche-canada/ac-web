import React from 'react'
import {Link} from '@reach/router'
import { storiesOf, action } from '@storybook/react'
import { Sidebar, Header, Item } from './index'

storiesOf('Sidebar')
    .add('Sidebar', () => (
        <Sidebar>
            <Header>Latest</Header>
            <Item>
                <Link to="#">
                    Blog Post #1
                </Link>
            </Item>
            <Item>
                <Link to="#">
                    Blog Post #2
                </Link>
            </Item>
        </Sidebar>
    ))
    .add('Sidebar w/o social', () => (
        <Sidebar noSocial>
            <Header>Latest</Header>
            <Item>
                <Link to="#">
                    Blog Post #1
                </Link>
            </Item>
            <Item>
                <Link to="#">
                    Blog Post #2
                </Link>
            </Item>
        </Sidebar>
    ))
