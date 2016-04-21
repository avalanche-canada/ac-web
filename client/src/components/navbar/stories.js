import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { AvalancheCanada, AvalancheCanadaFoundation } from './index'
import Menu from './Menu'
import Section from './Section'
import Header from './Header'
import Link from './Link'
import ColumnSet from './ColumnSet'

storiesOf('Navbar')
    .add('Avalanche Canada', () => <AvalancheCanada  />)
    .add('Avalanche Canada w/ user', () => <AvalancheCanada isAuthenticated name='Karl Guillotte' avatar='https://avatars1.githubusercontent.com/u/744011?v=3&s=40' />)
    .add('Avalanche Canada Foundation', () => <AvalancheCanadaFoundation />)
    .add('Menu', () => (
        <Menu isOpened>
            <Section>
                <Header>
                    <Link to='sled'>Snowmobile</Link>
                </Header>
                <Link to='sled/video-featured'>Throttle Decisions</Link>
                <Link to='sled/min'>Mountain Information Network</Link>
                <Link to='foundation/programs/memorialFunds'>Al Hodgson Memorial Fund</Link>
                <Link to='gear'>Essential gear</Link>
            </Section>
            <Section>
                <Header>
                    <Link to='youth'>Youth</Link>
                </Header>
                <Link to='youth/overview'>Overview</Link>
                <Link to='youth/programs'>Programs</Link>
                <Link to='youth/resources'>Resources</Link>
                <Link to='youth/curriculum'>Curriculum</Link>
            </Section>
            <Section>
                <Header>
                    <Link to='ambassadors'>Ambassadors</Link>
                </Header>
                <Link to='ambassadors'>Overview</Link>
                <Link to='ambassadors/nadine-overwater'>Nadine Overwater</Link>
                <Link to='ambassadors/robin-van-gyn'>Robin van Gyn</Link>
            </Section>
        </Menu>
    ))
