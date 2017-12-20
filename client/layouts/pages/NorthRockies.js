import React from 'react'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Sidebar } from 'components/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'

export default function NorthRockies() {
    return (
        <Page>
            <Header title="North Rockies" />
            <Content>
                <Main>
                    <NorthRockiesBlogFeed />
                </Main>
                <Aside>
                    <Sidebar />
                </Aside>
            </Content>
        </Page>
    )
}
