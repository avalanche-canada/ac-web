import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Header, Body, Navbar, Close } from 'components/page/drawer'
import Shim from 'components/Shim'
import { Submission, Metadata, TabSet, Gallery } from 'layouts/products/min'
import { Loading } from 'components/text'
import { Report } from 'containers/min'
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
            onLocateClick(geometry('Point', report.lnglat))
        }

        return (
            <h1>
                <Link to={this.link}>{report.title}</Link>
                <DisplayOnMap onClick={handleLocateClick} />
            </h1>
        )
    }
    children = ({ loading, data }) => (
        <Container>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Mountain Information Network">
                {data && this.renderHeader(data)}
            </Header>
            <Body>
                <Submission value={data}>
                    <Shim horizontal>
                        {loading && (
                            <Loading>
                                Loading Mountain Information Network reports...
                            </Loading>
                        )}
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
        return <Report id={this.props.id}>{this.children}</Report>
    }
}
