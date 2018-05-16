import React from 'react'
import { storiesOf, action } from '@storybook/react'
import Page from './Page'
import Main from './Main'
import Banner from './Banner'
import Article from './Article'
import Section from './Section'
import Header from './Header'
import Aside from './Aside'
import { table } from '../table/stories'

const sponsor = {
    name: 'Karl Guillotte',
    url: '//avatars1.githubusercontent.com/u/744011?v=3&s=40',
}

storiesOf('Pages', module)
    .add('Page', () => (
        <Page>
            <Banner url="//avalanche.ca/assets/images/youth/header-big.jpg" />
            <Main>
                <Article>
                    <Header
                        title="Go Farther — Get Avalanche Trained"
                        sponsor={sponsor}
                    />
                    <Section title="A title" headline="This is the headline.">
                        <p>Some text.</p>
                    </Section>
                    <Section title="Another title">
                        <p>Some more text.</p>
                    </Section>
                </Article>
            </Main>
            <Aside>
                Navigations
            </Aside>
        </Page>
    ))
    .add('Page with table (AST)', () => (
        <Page>
            <Banner url="//avalanche.ca/assets/images/youth/header-big.jpg" />
            <Main>
                <Article>
                    <Header title="All courses" />
                    {table}
                </Article>
            </Main>
        </Page>
    ))
    .add('Header', () => (
        <Header title="Go Farther — Get Avalanche Trained" sponsor={sponsor} />
    ))
    .add('Header w/ looooong title', () => (
        <Header
            title="Go Farther — Get Avalanche Trained and Go Farther — Get Avalanche Trained"
            sponsor={sponsor}
        />
    ))
    .add('Section', () => (
        <Section title="A section title">
            <p>Some section text content.</p>
        </Section>
    ))
    .add('Section w/ headline', () => (
        <Section title="A section title" headline="A section headline">
            <p>Some section text content.</p>
        </Section>
    ))
    .add('Banner', () => (
        <Banner url="//avalanche.ca/assets/images/youth/header-big.jpg" />
    ))
