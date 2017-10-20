import React from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
} from 'components/page/drawer'
import { Status } from 'components/misc'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { fatalAccident } from 'containers/connectors'
import { LocateAsClass } from 'components/button/Locate'
import { Wrapper } from 'components/tooltip'
import { parse } from 'prismic'
import { StructuredText } from 'prismic/components/base'

const LOCATE_STYLE = {
    padding: '0.15em',
}

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
                {title &&
                    <h1>
                        {title}
                        <Wrapper tooltip="Display on map">
                            <LocateAsClass
                                onClick={onLocateClick}
                                style={LOCATE_STYLE}
                            />
                        </Wrapper>
                    </h1>}
                {dateOfAccident &&
                    <Metadata>
                        <Entry term="Accident date">
                            <DateTime value={dateOfAccident} />
                        </Entry>
                    </Metadata>}
            </Header>
            {content &&
                <Body>
                    <StructuredText value={content} />
                </Body>}
        </Container>
    )
}

export default fatalAccident(FatalAccident)
