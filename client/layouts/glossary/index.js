import React, { lazy } from 'react'
import Bundle from 'components/Bundle'
import { Header } from 'components/page'
import { Page } from 'layouts/pages'
import styles from './Glossary.css'

const Glossary = lazy(() => import('./layouts'))

export default function Layout() {
    return (
        <Page className={styles.Page}>
            <Header title="Glossary" />
            <Bundle>
                <Glossary />
            </Bundle>
        </Page>
    )
}
