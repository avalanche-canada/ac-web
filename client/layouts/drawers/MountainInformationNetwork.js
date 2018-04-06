import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Header, Body, Navbar, Close } from 'components/page/drawer'
import Shim from 'components/Shim'
import {
    Submission,
    Metadata,
    TabSet,
    Gallery,
} from 'components/mountainInformationNetwork'
import { Status } from 'components/misc'
import MountainInformationNetworkSubmission from 'containers/MountainInformationNetworkSubmission'
import Sponsor from 'layouts/Sponsor'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { geometry } from '@turf/helpers'

export default class Layout extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    get link() {
        return `/mountain-information-network/submissions/${this.props.id}`
    }
    renderHeader = report => {
        const { onLocateClick } = this.props
        function handleLocateClick() {
            const latlng = report.get('latlng')
            const coordinates = latlng.toArray().reverse()

            onLocateClick(geometry('Point', coordinates))
        }

        return (
            <h1>
                <Link to={this.link}>{report.get('title')}</Link>
                <DisplayOnMap onClick={handleLocateClick} />
            </h1>
        )
    }
    children = ({ report, status }) => (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Mountain Information Network">
                {report && this.renderHeader(report)}
            </Header>
            <Body>
                <Submission value={report && report.toJSON()}>
                    <Shim horizontal>
                        <Status {...status} />
                        <Metadata />
                    </Shim>
                    <Shim vertical>
                        <TabSet />
                    </Shim>
                    <Gallery />
                </Submission>
            </Body>
        </Container>
    )
    render() {
        return (
            <MountainInformationNetworkSubmission id={this.props.id}>
                {this.children}
            </MountainInformationNetworkSubmission>
        )
    }
}
