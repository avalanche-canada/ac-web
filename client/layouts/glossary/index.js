import React, { lazy } from 'react'
import Bundle from 'components/Bundle'
import { Header } from 'components/page'
import { Page } from 'layouts/pages'
import styles from './Glossary.module.css'
import { useIntl } from 'react-intl'

const Glossary = lazy(() => import('./layouts'))

export default function Layout() {
    const intl = useIntl()
    return (
        <Page className={styles.Page}>
            <Header
                title={intl.formatMessage({
                    defaultMessage: 'Glossary',
                    description: 'Layout glossary/index',
                })}
            />
            <Bundle>
                <Glossary />
            </Bundle>
        </Page>
    )
}
