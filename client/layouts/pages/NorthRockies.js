import React, { PureComponent } from 'react'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Sidebar } from 'components/forecast'
import { NorthRockiesBlogFeed } from 'layouts/feed'
import { SPAW as SPAWComponent } from 'components/misc'
import { Region as SPAW } from 'layouts/SPAW'
import { StructuredText } from 'prismic/components/base'

export default class NorthRockies extends PureComponent {
    renderSPAW = ({ document }) => {
        const { link, description } = document
        const style = {
            display: 'block',
            marginTop: '1em',
        }

        return (
            <SPAWComponent link={link} style={style}>
                <StructuredText value={description} />
                {link && <p> Click for more information.</p>}
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
