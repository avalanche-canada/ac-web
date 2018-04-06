import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as Hzr from 'layouts/hzr'
import { Container, Navbar, Header, Body, Close } from 'components/page/drawer'
import { Status } from 'components/misc'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
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
                        <span>{title}</span>
                    )}
                    {hotZone && <DisplayOnMap onClick={handleLocateClick} />}
                </h1>
            </Header>
        )
    }
    renderChildren = ({ report, status }) => ({ hotZone }) => (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            {this.renderHeader({ report, status, hotZone })}
            <Body>
                <Shim horizontal>
                    <Status {...status} />
                </Shim>
                {status.isLoaded && (
                    <Hzr.Report value={report && report.data}>
                        <Shim horizontal>
                            <Hzr.Metadata shareUrl={utils.shareUrl(report)} />
                            <Hzr.Header />
                        </Shim>
                        <Hzr.Gallery />
                        <Hzr.CriticalFactors />
                        <Hzr.TerrainAndTravelAdvice />
                        <Hzr.TerrainAdviceSet />
                        <Hzr.Footer />
                    </Hzr.Report>
                )}
            </Body>
        </Container>
    )
    children = props => (
        <HotZone id={this.props.name}>{this.renderChildren(props)}</HotZone>
    )
    render() {
        return (
            <HotZoneReportContainer region={this.props.name}>
                {this.children}
            </HotZoneReportContainer>
        )
    }
}
