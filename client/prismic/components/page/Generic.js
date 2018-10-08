import React from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Main, Header } from 'components/page'
import { Loading } from 'components/text'
import { StructuredText } from 'prismic/components/base'

Generic.propTypes = {
    title: PropTypes.string,
    document: PropTypes.object,
    loading: PropTypes.bool,
}

export default function Generic({ title, loading, document }) {
    return (
        <Page>
            <Header title={document?.data?.title || title} />
            <Content>
                <Loading show={loading}>
                    {title ? `Loading ${title} page...` : 'Loading  page...'}
                </Loading>
                <Main>
                    <StructuredText value={document?.data?.body} />
                </Main>
            </Content>
        </Page>
    )
}
