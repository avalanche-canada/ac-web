import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { point } from '@turf/helpers'
import { Loading, Muted } from 'components/text'
import { InnerHTML } from 'components/misc'
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
} from 'layouts/products/mcr'
import { Report } from 'containers/mcr'

const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
    children = ({ data, loading }) => {
        const { id } = this.props
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
        } = data || {}

        if (Array.isArray(location)) {
            this.geometry = point(location)
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
                    <Loading show={loading}>
                        Loading Mountain Conditions Report...
                    </Loading>
                    {body && <InnerHTML>{body}</InnerHTML>}
                    {!loading && !body && (
                        <Muted>Report #{id} is not available anymore.</Muted>
                    )}
                    <Footer />
                </Content>
            </Fragment>
        )
    }
    render() {
        return (
            <Container>
                <Body>
                    <Navbar style={NAVBAR_STYLE}>
                        <Close shadow onClick={this.props.onCloseClick} />
                    </Navbar>
                    <Report id={Number(this.props.id)}>{this.children}</Report>
                </Body>
            </Container>
        )
    }
}
