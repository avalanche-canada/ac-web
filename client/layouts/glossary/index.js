import React, { lazy } from 'react'
import Bundle from 'components/Bundle'
import { Header } from 'components/page'
import { Page } from 'layouts/pages'

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
