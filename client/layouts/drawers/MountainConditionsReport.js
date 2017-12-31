import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { geometry } from '@turf/helpers'
import { InnerHTML, Status } from 'components/misc'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from 'components/page/drawer'
import {
    Footer,
    Submitter,
    DateSet,
    Location,
    Media,
} from 'components/products/mcr'
import MountainConditionsReportContainer from 'containers/MountainConditionsReport'

const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}

const BODY_STYLE = {
    padding: 0,
}

export default class MountainConditionsReport extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    handleLocateClick = () => {
        this.props.onLocateClick(this.geometry)
    }
    children = ({ report = new Immutable.Map(), status }) => {
        const { isLoaded } = status
        const {
            locationDescription,
            permalink,
            body,
            title,
            images,
            user,
            dates,
            groups,
            location,
        } = report.toJSON()

        if (Array.isArray(location)) {
            this.geometry = geometry('Point', location)
        }

        return (
            <Fragment>
                <Banner>
                    <Media images={images} />
                </Banner>
                <Header subject="Arc'Teryx Mountain Conditions Report">
                    {title && (
                        <h1>
                            <a href={permalink} target={permalink}>
                                {title}
                            </a>
                        </h1>
                    )}
                    {Array.isArray(dates) && <DateSet values={dates} />}
                    {locationDescription && (
                        <Location
                            description={locationDescription}
                            onLocateClick={this.handleLocateClick}
                        />
                    )}
                    {user && <Submitter {...user} groups={groups} />}
                </Header>
                <Content>
                    <Status {...status} />
                    {body && <InnerHTML>{body}</InnerHTML>}
                    {isLoaded && <Footer />}
                </Content>
            </Fragment>
        )
    }
    render() {
        return (
            <Container>
                <Body style={BODY_STYLE}>
                    <Navbar style={NAVBAR_STYLE}>
                        <Close shadow onClick={this.props.onCloseClick} />
                    </Navbar>
                    <MountainConditionsReportContainer id={this.props.id}>
                        {this.children}
                    </MountainConditionsReportContainer>
                </Body>
            </Container>
        )
    }
}
