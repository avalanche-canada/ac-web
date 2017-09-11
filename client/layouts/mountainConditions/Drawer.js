import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Gallery from '~/components/gallery'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from '~/components/page/drawer'
import { LocateAsClass } from '~/components/button/Locate'
import Footer from './Footer'
import Submitter from './Submitter'
import { InnerHTML, DateElement, Status } from '~/components/misc'
import CSSModules from 'react-css-modules'
import styles from './MountainConditionsReport.css'
import IMAGE from '~/styles/mountain-climbers-default.jpg'

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
    onLocateClick: PropTypes.func.isRequired,
}

function Drawer({
    report = new Immutable.Map(),
    onCloseClick,
    onLocateClick,
    status,
}) {
    const subject = "Arc'Teryx Mountain Conditions Report"
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
    } = report.toJSON()

    let banner

    if (isLoaded) {
        if (images.length === 0) {
            banner = <img src={IMAGE} />
        } else {
            banner = (
                <Gallery
                    items={images.map(original => ({ original }))}
                    showThumbnails={false}
                    showBullets
                    showPlayButton={false}
                />
            )
        }
    }

    return (
        <Container>
            <Body style={BODY_STYLE}>
                <Navbar style={NAVBAR_STYLE}>
                    <Close shadow onClick={onCloseClick} />
                </Navbar>
                <Banner>
                    {banner}
                </Banner>
                <Header subject={subject}>
                    {title &&
                        <h1>
                            <a href={permalink} target="_blank">
                                {title}
                            </a>
                            <LocateAsClass onClick={onLocateClick} />
                        </h1>}
                    {Array.isArray(dates) &&
                        <div styleName="Date">
                            {dates.reduce((elements, date) => {
                                if (elements.length > 0) {
                                    elements.push(' to ')
                                }

                                elements.push(<DateElement value={date} />)

                                return elements
                            }, [])}
                        </div>}
                    {locationDescription &&
                        <InnerHTML styleName="Location">
                            {locationDescription}
                        </InnerHTML>}
                    {user && <Submitter {...user}  groups={groups}/>}
                </Header>
                <Content>
                    <Status {...status.toJSON()} />
                    {body &&
                        <InnerHTML>
                            {body}
                        </InnerHTML>}
                    {isLoaded && <Footer />}
                </Content>
            </Body>
        </Container>
    )
}

export default CSSModules(Drawer, styles)
