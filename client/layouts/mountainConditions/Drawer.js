import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from '~/components/page/drawer'
import Footer from './Footer'
import Submitter from './Submitter'
import { InnerHTML, DateElement, Status } from '~/components/misc'
import CSSModules from 'react-css-modules'
import styles from './MountainConditionsReport.css'
import IMAGE from '~/styles/mcr-logo.jpg'

const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}

const BODY_STYLE = {
    padding: 0,
}

Drawer.propTypes = {
    report: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired,
}

function Drawer({ report = new Immutable.Map(), onCloseClick, status }) {
    const subject = "Arc'Teryx Mountain Conditions Report"
    const {
        locationDescription,
        permalink,
        body,
        title,
        // image,
        user,
        date,
    } = report.toJSON()

    return (
        <Container>
            <Body style={BODY_STYLE}>
                <Navbar style={NAVBAR_STYLE}>
                    <Close shadow onClick={onCloseClick} />
                </Navbar>
                <Banner url={IMAGE} />
                <Header subject={subject}>
                    <h1 styleName="Title">
                        <a href={permalink} target="_blank">
                            {title}
                        </a>
                    </h1>
                    <div styleName="Date">
                        <DateElement value={date} />
                    </div>
                    <InnerHTML styleName="Location">
                        {locationDescription}
                    </InnerHTML>
                    <Submitter {...user} certification="ACMG" />
                </Header>
                <Content>
                    <Status {...status.toJSON()} />
                    <InnerHTML>{body}</InnerHTML>
                    <Footer />
                </Content>
            </Body>
        </Container>
    )
}

export default CSSModules(Drawer, styles)
