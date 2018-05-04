import React, { Component } from 'react'
import Bundle from 'components/Bundle'
import { Loading } from 'components/text'
import { Page, Content } from 'components/page'
import loadLayout from 'bundle-loader?lazy!./Layout'

export default class Tutorial extends Component {
    renderer = Component =>
        Component ? (
            // TODO: Avoid passing location...
            <Component location={this.props.location} />
        ) : (
            <Page>
                <Content>
                    <h1>
                        <Loading />
                    </h1>
                </Content>
            </Page>
        )
    render() {
        return <Bundle load={loadLayout}>{this.renderer}</Bundle>
    }
}
