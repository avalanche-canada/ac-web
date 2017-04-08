import React from 'react'
import PropTypes from 'prop-types'
import {Header, Container, Body, Navbar, Close, Banner, Content} from 'components/page/drawer'
import {InnerHTML, Status, DateTime} from 'components/misc'
import {Metadata, Entry} from 'components/metadata'
import {fatalAccident} from 'containers/connectors'
import {LocateAsClass} from 'components/button/Locate'
import {Wrapper} from 'components/tooltip'

const LOCATE_STYLE = {
    padding: '0.15em'
}

function FatalAccident({
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
            <Header subject='Fatal Recreational Accident'>
                <Status {...status.toJSON()} />
                {report &&
                    <h1>
                        {report.title}
                        <Wrapper tooltip='Display on map'>
                            <LocateAsClass onClick={onLocateClick} style={LOCATE_STYLE} />
                        </Wrapper>
                    </h1>
                }
                {report &&
                    <Metadata>
                        <Entry term='Accident date'>
                            <DateTime value={report.dateOfAccident} />
                        </Entry>
                    </Metadata>
                }
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

export default fatalAccident(FatalAccident)
