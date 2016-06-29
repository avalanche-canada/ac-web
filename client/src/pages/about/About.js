import React, {PropTypes} from 'react'
import {Page, Header, Main, Section} from 'components/page'
import {Html} from 'prismic'
import {Section as PrismicSection, Biography} from 'prismic/components/groups'

About.propTypes = {
    document: PropTypes.object.isRequired,
}

export default function About({document}) {
    if (!document) {
        return (
            <p>Loading...</p>
        )
    }

    if (document instanceof Error) {
        return (
            <p>Error!!!</p>
        )
    }

    const board = document.getGroup('board')
    const staff = document.getGroup('staff')

    return (
        <Page>
            <Header title='About &mdash; Avalanche Canada' />
            <Main>
                <PrismicSection document={document} />
                <Section title='Board'>
                    {board.map(member => <Biography document={member} />)}
                </Section>
                <Section title='Staff'>
                    {staff.map(member => <Biography document={member} />)}
                </Section>
                <Section title='Address'>
                    Address...
                </Section>
                <Section title='Contact'>
                    Contact form...
                </Section>
            </Main>
        </Page>
    )
}
