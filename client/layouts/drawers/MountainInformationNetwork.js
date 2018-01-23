import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Header, Container, Body, Navbar, Close } from 'components/page/drawer'
import { Metadata, Submission } from 'components/mountainInformationNetwork'
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
    renderHeader(report) {
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
        <Fragment>
            <Header subject="Mountain Information Network">
                {report && this.renderHeader(report)}
            </Header>
            <Body>
                <Status {...status} />
                {report && <Metadata report={report} shareable />}
                {report && <Submission report={report} />}
            </Body>
        </Fragment>
    )
    render() {
        return (
            <Container>
                <Navbar>
                    <Sponsor label={null} />
                    <Close onClick={this.props.onCloseClick} />
                </Navbar>
                <MountainInformationNetworkSubmission id={this.props.id}>
                    {this.children}
                </MountainInformationNetworkSubmission>
            </Container>
        )
    }
}
