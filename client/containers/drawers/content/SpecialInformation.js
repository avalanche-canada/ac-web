import React from 'react'
import PropTypes from 'prop-types'
import { Header, Container, Body, Navbar, Close } from 'components/page/drawer'
import { InnerHTML, Status } from 'components/misc'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { specialInformation } from 'containers/connectors'
import DisplayOnMap from './DisplayOnMap'

const LOCATION_STYLE = {
    fontSize: '1.1em',
}

SpecialInformation.propTypes = {
    report: PropTypes.object,
    // TODO: Use status PropTypes
    status: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

function SpecialInformation({ report, status, onCloseClick, onLocateClick }) {
    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject="Special Information">
                <Status {...status.toJSON()} />
                {report && (
                    <h1>
                        {report.headline}
                        <DisplayOnMap onClick={onLocateClick} />
                    </h1>
                )}
            </Header>
            {report && (
                <Body>
                    <Metadata>
                        <Entry term="Date Issued">
                            <DateTime value={report.dateOfIssue} />
                        </Entry>
                        <Entry term="Valid Until">
                            {report.validUntil ? (
                                <DateTime value={report.validUntil} />
                            ) : (
                                'Further notice'
                            )}
                        </Entry>
                        {report.dateUpdated && (
                            <Entry term="Date Updated">
                                <DateTime value={report.dateUpdated} />
                            </Entry>
                        )}
                    </Metadata>
                    <p style={LOCATION_STYLE}>{report.locationDescription}</p>
                    <InnerHTML>{report.content}</InnerHTML>
                </Body>
            )}
        </Container>
    )
}

export default specialInformation(SpecialInformation)
