import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as Hzr from 'layouts/products/hzr'
import { Container, Navbar, Header, Body, Close } from 'components/page/drawer'
import { Status } from 'components/misc'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { HotZoneReport as HotZoneReportContainer } from 'prismic/containers'
import { HotZone } from 'containers/features'
import * as utils from 'utils/hzr'

export default class HotZoneReportDrawer extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    renderHeader(props) {
        const { name, onLocateClick } = this.props
        const { report } = props

        return (
            <Header subject="Hot Zone Report">
                <HotZone name={this.props.name}>
                    {({ data }) => {
                        const title = utils.title({ ...props, hotZone: data })

                        return (
                            <h1>
                                {report ? (
                                    <Link to={`/hot-zone-reports/${name}`}>
                                        {title}
                                    </Link>
                                ) : (
                                    <span>{title}</span>
                                )}
                                <DisplayOnMap
                                    onClick={() => {
                                        onLocateClick(utils.geometry(data))
                                    }}
                                />
                            </h1>
                        )
                    }}
                </HotZone>
            </Header>
        )
    }
    renderReport = ({ report, status }) => (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            {this.renderHeader({ report, status })}
            <Body>
                <Shim horizontal>
                    <Status {...status} />
                </Shim>
                {status.isLoaded && (
                    <Hzr.Report value={report}>
                        <Shim horizontal>
                            <Hzr.Metadata shareable />
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
    render() {
        return (
            <HotZoneReportContainer region={this.props.name}>
                {this.renderReport}
            </HotZoneReportContainer>
        )
    }
}
