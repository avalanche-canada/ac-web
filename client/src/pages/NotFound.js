import React, {PropTypes} from 'react'
import {Page, Main, Section, Header} from 'components/page'
import {Link} from 'react-router'

NotFound.propTypes = {
    children: PropTypes.element,
}

export default function NotFound({children}) {
    return (
        <Page>
            <Header title='Oups :('/>
            <Main>
                <h2>The page you are looking for has not been found.</h2>
                {children}
            </Main>
        </Page>
    )
}
