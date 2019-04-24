import React from 'react'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Sidebar } from 'layouts/products/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import SPAW from './SPAW'

export default function NorthRockies() {
    return (
        <Page>
            <Header title="North Rockies" />
            <Content>
                <Main>
                    <SPAW name="north-rockies" />
                    <NorthRockiesBlogFeed />
                </Main>
                <Aside>
                    <Sidebar />
                </Aside>
            </Content>
        </Page>
    )
}
