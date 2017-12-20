import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Navbar, Header, Container, Body, Close } from 'components/page/drawer'
import { Status } from 'components/misc'
import HotZoneReport, { Metadata } from 'components/hotZoneReport'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from './DisplayOnMap'
import { HotZoneReport as HotZoneReportContainer } from 'prismic/containers'
import HotZone from 'containers/HotZone'
import * as utils from 'utils/hzr'

export default class HotZoneReportDrawer extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderHeader(props) {
        const { name, onLocateClick } = this.props
        const title = utils.title(props)
        const { report, hotZone } = props
        function handleLocateClick() {
            onLocateClick(utils.geometry(hotZone))
        }

        return (
            <Header subject="Hot Zone Report">
                <h1>
                    {report ? (
                        <Link to={`/hot-zone-reports/${name}`}>{title}</Link>
                    ) : (
                        title
                    )}
                    {hotZone && <DisplayOnMap onClick={handleLocateClick} />}
                </h1>
            </Header>
        )
    }
    renderChildren = ({ report, status }) => ({ hotZone }) => [
        this.renderHeader({ report, status, hotZone }),
        <Body>
            <Status {...status} />
            {report && (
                <Metadata report={report} shareUrl={utils.shareUrl(report)} />
            )}
            {status.isLoaded && (
                <HotZoneReport report={report && report.data} />
            )}
        </Body>,
    ]
    children = props => (
        <HotZone id={this.props.name}>{this.renderChildren(props)}</HotZone>
    )
    render() {
        return (
            <Container>
                <Navbar>
                    <Sponsor label={null} />
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <HotZoneReportContainer region={this.props.name}>
                    {this.children}
                </HotZoneReportContainer>
            </Container>
        )
    }
}
