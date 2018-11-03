import React, { lazy } from 'react'
import { Page, Main, Content, Header } from 'components/page'
import Bundle from 'components/Bundle'

const Incidents = lazy(() => import('./layouts'))

export default function Layout() {
    return (
        <Page>
            <Header title="Historical Incidents" />
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
