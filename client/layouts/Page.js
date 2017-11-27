import React from 'react'
import PropTypes from 'prop-types'
import { Page, Header, Main, Content, Headline, Section } from 'components/page'

PageLayout.propTypes = {
    title: PropTypes.string.isRequired,
    headline: PropTypes.node,
    children: PropTypes.node.isRequired,
}

export default function PageLayout({ title, headline, children }) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Section>
                        {headline && <Headline>{headline}</Headline>}
                        {children}
                    </Section>
                </Main>
            </Content>
        </Page>
    )
}
