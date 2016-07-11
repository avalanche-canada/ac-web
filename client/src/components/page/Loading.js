import React, {PropTypes} from 'react'
import {Page, Main, Header} from 'components/page'
import {Muted} from 'components/misc'

Loading.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
}

export default function Loading({title = message, message = 'Loading...'}) {
    return (
        <Page>
            <Header title={title} />
            <Main>
                <Muted>{message}</Muted>
            </Main>
        </Page>
    )
}
