import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Gallery from 'components/gallery'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from 'components/page/drawer'
import { Locate } from 'components/button'
import Footer from './Footer'
import Submitter from './Submitter'
import { InnerHTML, Status } from 'components/misc'
import { DateElement } from 'components/time'
import styles from './MountainConditionsReport.css'
import IMAGE from 'styles/mountain-climbers-default.jpg'

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

export default function Drawer({
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

    let banner = null

    if (isLoaded) {
        if (!Array.isArray(images) || images.length === 0) {
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
                <Banner>{banner}</Banner>
                <Header subject={subject}>
                    {title && (
                        <h1>
                            <a href={permalink} target={permalink}>
                                {title}
                            </a>
                        </h1>
                    )}
                    {Array.isArray(dates) && (
                        <div className={styles.Date}>
                            {dates.reduce((elements, date, index) => {
                                if (elements.length > 0) {
                                    elements.push(' to ')
                                }

                                elements.push(
                                    <DateElement key={index} value={date} />
                                )

                                return elements
                            }, [])}
                        </div>
                    )}
                    <div className={styles.Location}>
                        {locationDescription && (
                            <InnerHTML className={styles.LocationDescription}>
                                {locationDescription}
                            </InnerHTML>
                        )}
                        {isLoaded && <Locate onClick={onLocateClick} />}
                    </div>
                    {user && <Submitter {...user} groups={groups} />}
                </Header>
                <Content>
                    <Status {...status.toJSON()} />
                    {body && <InnerHTML>{body}</InnerHTML>}
                    {isLoaded && <Footer />}
                </Content>
            </Body>
        </Container>
    )
}
