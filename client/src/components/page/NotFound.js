import React, {PropTypes} from 'react'
import {Page, Main, Header} from 'components/page'

NotFound.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.element,
}

export default function NotFound({
    title = 'Oups :( This is an avalanche 404 size error',
    subtitle = 'The page you are looking for has not been found.',
    children
}) {
    return (
        <Page>
            <Header title={title} />
            <Main>
                <h2>{subtitle}</h2>
                {children}
            </Main>
        </Page>
    )
}
