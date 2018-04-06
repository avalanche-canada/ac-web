import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import isSupported from '@mapbox/mapbox-gl-supported'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { MountainInformationNetwork as Link } from 'components/links'
import { Item } from 'components/sidebar'
import { Status } from 'components/misc'
import Container from 'containers/MountainInformationNetworkSubmission'
import {
    Submission,
    TabSet,
    Gallery,
    Metadata,
    Map,
    Sidebar,
} from 'layouts/min'

export default class Layout extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
    }
    renderHeader(report) {
        const title = report
            ? report.get('title')
            : 'Mountain Information Network'

        return <Header title={title} />
    }
    children = ({ status, report }) => (
        <Fragment>
            {this.renderHeader(report)}
            <Content>
                <Main>
                    <Status {...status} />
                    <Submission value={report && report.toJSON()}>
                        <Metadata />
                        <Map />
                        <TabSet />
                        <Gallery />
                    </Submission>
                </Main>
                <Aside>
                    <Sidebar>
                        {isSupported() && (
                            <Item>
                                <Link id={this.props.id}>
                                    See this submission on the main map
                                </Link>
                            </Item>
                        )}
                    </Sidebar>
                </Aside>
            </Content>
        </Fragment>
    )
    render() {
        return (
            <Page>
                <Container id={this.props.id}>{this.children}</Container>
            </Page>
        )
    }
}
