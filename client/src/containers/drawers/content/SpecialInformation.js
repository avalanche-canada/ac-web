import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Header, Container, Body, Navbar, Close, Banner, Content} from 'components/page/drawer'
import {InnerHTML, Status} from 'components/misc'
import {specialInformation} from 'containers/connectors'
import {LocateAsClass} from 'components/button/Locate'
import {Wrapper} from 'components/tooltip'

const LOCATION_STYLE = {
    fontSize: '1.1em',
}
const LOCATE_STYLE = {
    padding: '0.15em'
}

function SpecialInformation({
    report,
    status,
    onCloseClick,
    onLocateClick,
}) {
    return (
        <Container>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header subject='Special Information'>
                {report &&
                    <h1>
                        {report.headline}
                        <Wrapper tooltip='Display on map'>
                            <LocateAsClass onClick={onLocateClick} style={LOCATE_STYLE} />
                        </Wrapper>
                    </h1>
                }
                {report &&
                    <p style={LOCATION_STYLE}>{report.locationDescription}</p>
                }
                <Status {...status} />
            </Header>
            {report &&
                <Body>
                    <InnerHTML>
                        {report.content}
                    </InnerHTML>
                </Body>
            }
        </Container>
    )
}

export default specialInformation(SpecialInformation)
