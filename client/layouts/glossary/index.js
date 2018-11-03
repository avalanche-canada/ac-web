import React, { lazy } from 'react'
import Bundle from 'components/Bundle'
import { Page, Header } from 'components/page'

const Glossary = lazy(() => import('./layouts'))

export default function Layout() {
    return (
        <Page>
            <Header title="Glossary" />
            <Bundle>
                <Glossary />
            </Bundle>
        </Page>
    )
}
