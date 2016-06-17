import React, { PropTypes } from 'react'
import {Page, Header, Main, Section, SectionHeader} from 'components/page'

export default function About({ children }) {
    return (
        <Page>
            <Main>
                <Header title='Collaborators &mdash; Avalanche Canada' />
                <Section>Section content</Section>
                <Section>Section content</Section>
                <Section>Section content</Section>
                <Section>Section content</Section>
            </Main>
        </Page>
    )
}
