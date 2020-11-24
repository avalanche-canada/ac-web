import React, { lazy } from 'react'
import { Main, Content, Header } from 'components/page'
import { Page } from 'layouts/pages'
import Bundle from 'components/Bundle'
import { useIntl } from 'react-intl'

const Incidents = lazy(() => import('./layouts'))

export default function Layout() {
    const intl = useIntl()
    return (
        <Page>
            <Header
                title={intl.formatMessage({
                    defaultMessage: 'Historical Incidents',
                    description: 'Layout incidents/index',
                })} />
            <Content>
                <Main>
                    <Bundle>
                        <Incidents />
                    </Bundle>
                </Main>
            </Content>
        </Page>
    )
}
