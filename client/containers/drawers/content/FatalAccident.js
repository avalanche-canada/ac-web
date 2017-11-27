import React from 'react'
import PropTypes from 'prop-types'
import { Header, Container, Body, Navbar, Close } from 'components/page/drawer'
import { Status } from 'components/misc'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { fatalAccident } from 'containers/connectors'
import { parse } from 'prismic'
import { StructuredText } from 'prismic/components/base'
import DisplayOnMap from './DisplayOnMap'

FatalAccident.propTypes = {
    report: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function FatalAccident({ report, status, onCloseClick, onLocateClick }) {
    const { title, dateOfAccident, content } = parse(report).data

    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Fatal Recreational Accident">
                <Status {...status.toJSON()} />
                {title && (
                    <h1>
                        {title}
                        <DisplayOnMap onClick={onLocateClick} />
                    </h1>
                )}
            </Header>
            <Body>
                {dateOfAccident && (
                    <Metadata>
                        <Entry term="Accident date">
                            <DateTime value={dateOfAccident} />
                        </Entry>
                    </Metadata>
                )}
                {content && <StructuredText value={content} />}
            </Body>
        </Container>
    )
}

export default fatalAccident(FatalAccident)
