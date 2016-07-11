import React, {PropTypes} from 'react'
import {Page, Main, Header} from 'components/page'
import {InnerHTML} from 'components/misc'

Generic.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default function Generic({title, body}) {
    return (
        <Page>
            <Header title={title} />
            <Main>
                <InnerHTML>
                    {body}
                </InnerHTML>
            </Main>
        </Page>
    )
}
