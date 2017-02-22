import React, {PropTypes} from 'react'
import {Page, Content, Main, Header} from 'components/page'
import {InnerHTML, Status} from 'components/misc'

Generic.propTypes = {
    title: PropTypes.string,
    document: PropTypes.object,
    status: PropTypes.object,
}

export default function Generic({title, status, document = {}}) {
    return (
        <Page>
            <Header title={document.title || title} />
            <Content>
                <Status {...status.toJSON()} />
                <Main>
                    <InnerHTML>
                        {document.body}
                    </InnerHTML>
                </Main>
            </Content>
        </Page>
    )
}
