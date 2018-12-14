import React, { PureComponent } from 'react'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Sidebar } from 'layouts/products/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { SPAW as SPAWComponent } from 'components/misc'
import { Region as SPAW } from 'layouts/SPAW'
import Device, { touchable } from 'components/Device'

export default class NorthRockies extends PureComponent {
    renderSPAW = ({ document }) => {
        const { link, description } = document.data
        const style = {
            display: 'block',
            marginTop: '1em',
        }

        return (
            <SPAWComponent link={link} style={style}>
                <p>
                    {description[0].text} <Device>{touchable}</Device> for more
                    information.
                </p>
            </SPAWComponent>
        )
    }
    render() {
        return (
            <Page>
                <Header title="North Rockies" />
                <Content>
                    <Main>
                        <SPAW name="north-rockies">{this.renderSPAW}</SPAW>
                        <NorthRockiesBlogFeed />
                    </Main>
                    <Aside>
                        <Sidebar />
                    </Aside>
                </Content>
            </Page>
        )
    }
}
