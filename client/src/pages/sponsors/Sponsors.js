import React, {PropTypes} from 'react'
import {Page, Main, Section, Header} from 'components/page'
import {ItemSet, Item} from 'components/sponsor'

Sponsors.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        sponsors: PropTypes.arrayOf(Item.propTypes).isRequired,
    })).isRequired
}

export default function Sponsors({ sections = [] }) {
    return (
        <Page>
            <Header title='Sponsors' />
            <Main>
                {sections.map(({title, sponsors}, index) => (
                    <Section key={index} title={title}>
                        <ItemSet>
                            {sponsors.map((sponsor, index) => (
                                <Item key={index} {...sponsor} />
                            ))}
                        </ItemSet>
                    </Section>
                ))}
            </Main>
        </Page>
    )
}
