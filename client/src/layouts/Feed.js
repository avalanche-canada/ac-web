import React, {PropTypes} from 'react'
import {FilterSet, Section} from 'containers/feed'
import {Page, Content, Header, Main} from 'components/page'

Feed.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default function Feed({type, title}) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <FilterSet type={type} />
                    <Section type={type} />
                </Main>
            </Content>
        </Page>
    )
}
