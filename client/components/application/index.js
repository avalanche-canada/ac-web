import React from 'react'
import styles from './Application.css'
import * as Page from 'components/page'
import * as Text from 'components/text'
import Navbar from 'components/navbar'

export default function Application({ children }) {
    return <div className={styles.Application}>{children}</div>
}

export function Fallback({ error, navbar, children }) {
    return (
        <Application>
            {navbar || <Navbar />}
            <Page.Error>
                <Page.Main>
                    <h1>Uh oh! We never thought that would happen...</h1>
                    <Page.Headline>
                        An error happened on a page you tried to visit.
                        <Text.Error>{error.message}</Text.Error>
                    </Page.Headline>
                    {children}
                </Page.Main>
            </Page.Error>
        </Application>
    )
}
