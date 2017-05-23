import React from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Main, Header } from '~/components/page'
import { Status } from '~/components/misc'
import { StructuredText } from '~/prismic/components/base'
import { parse } from '~/prismic'

Generic.propTypes = {
    title: PropTypes.string,
    document: PropTypes.object,
    status: PropTypes.object,
}

export default function Generic({ title, status, document }) {
    const generic = parse(document, { title }).data

    return (
        <Page>
            <Header title={generic.title} />
            <Content>
                <Status {...status.toJSON()} />
                <Main>
                    <StructuredText value={generic.body} />
                </Main>
            </Content>
        </Page>
    )
}
