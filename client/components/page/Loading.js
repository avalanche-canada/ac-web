import React from 'react'
import PropTypes from 'prop-types'
import { Page, Content, Main, Header } from '~/components/page'
import { Muted } from '~/components/misc'

Loading.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
}

export default function Loading({ title = message, message = 'Loading...' }) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Muted>{message}</Muted>
                </Main>
            </Content>
        </Page>
    )
}
