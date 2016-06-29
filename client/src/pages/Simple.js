import React, {PropTypes} from 'react'
import {Page, Main, Header} from 'components/page'
import {InnerHTML, Muted} from 'components/misc'

Simple.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.element,
}

export default function Simple({title, message, children}) {
    return (
        <Page>
            <Header title={title} />
            <Main>
                {message ?
                    <Muted>{message}</Muted> :
                    <InnerHTML>
                        {children}
                    </InnerHTML>
                }
            </Main>
        </Page>
    )
}
