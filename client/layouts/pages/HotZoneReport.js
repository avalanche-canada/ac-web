import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Page, Header, Main, Content, Aside } from 'components/page'
import { Status } from 'components/misc'
import { Item } from 'components/sidebar'
import { Sidebar } from 'components/hotZoneReport'
import { Report } from 'components/hotZoneReport'
import { HotZoneReport as Container } from 'prismic/containers'
import HotZone from 'containers/HotZone'
import * as utils from 'utils/hzr'

export default class HotZoneReportLayout extends PureComponent {
    static propTypes = {
        region: PropTypes.string.isRequired,
        uid: PropTypes.string,
    }
    renderHeader = props => {
        return <Header title={utils.title(props)} />
    }
    renderSidebar = report => {
        const { region } = this.props

        return (
            <Sidebar shareUrl={report && utils.shareUrl(report)}>
                <Item>
                    <Link to={`/map/hot-zone-reports/${region}`}>
                        See that report on the main map
                    </Link>
                </Item>
            </Sidebar>
        )
    }
    renderChildrenFactory = ({ report, status }) => ({ hotZone }) => (
        <Fragment>
            {this.renderHeader({ report, status, hotZone })}
            <Content>
                <Main>
                    <Status {...status} />
                    {status.isLoaded && (
                        <Report value={report && report.data} />
                    )}
                </Main>
                <Aside>{this.renderSidebar(report)}</Aside>
            </Content>
        </Fragment>
    )
    children = props => (
        <HotZone id={this.props.region}>
            {this.renderChildrenFactory(props)}
        </HotZone>
    )
    render() {
        return (
            <Page>
                <Container {...this.props}>{this.children}</Container>
            </Page>
        )
    }
}
