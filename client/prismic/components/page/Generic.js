import React from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Main, Header } from 'components/page'
import { Status } from 'components/misc'
import { StructuredText } from 'prismic/components/base'

Generic.propTypes = {
    title: PropTypes.string,
    document: PropTypes.object,
    status: PropTypes.object,
}

export default function Generic({ title, status, document = {} }) {
    const { data = {} } = document

    return (
        <Page>
            <Header title={data.title || title} />
            <Content>
                <Status {...status} />
                <Main>
                    <StructuredText value={data.body} />
                </Main>
            </Content>
        </Page>
    )
}
