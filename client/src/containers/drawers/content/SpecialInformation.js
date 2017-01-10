import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Header, Container, Body, Navbar, Close, Banner, Content} from 'components/page/drawer'
import {Loading, Error, InnerHTML, Ratio} from 'components/misc'
import {Link} from 'react-router'
import getSpecialInformation from 'selectors/prismic/specialInformation'
import format from 'date-fns/format'

const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}

const BODY_STYLE = {
    padding: 0,
    marginTop: '5em',
}

const LOCATION_STYLE = {
    fontSize: '1.1em',
}

function SpecialInformation({
    report = {},
    isLoading,
    isError,
    messages,
    onCloseClick,
}) {
    const {
        headline,
        locationDescription,
        content,
        date,
    } = report
    let subject = 'Special Information'

    if (date) {
        subject = `${subject} for ${format(date, 'dddd MMMM D')}`
    }

    return (
        <Container>
            <Body style={BODY_STYLE}>
                <Navbar style={NAVBAR_STYLE}>
                    <Close onClick={() => onCloseClick()} />
                </Navbar>
                <Header subject={subject}>
                    <h1>{headline}</h1>
                    <div style={LOCATION_STYLE}>{locationDescription}</div>
                </Header>
                <Content>
                    {isError && <Error>{messages.error}</Error>}
                    {isLoading && <Loading>{messages.loading}</Loading>}
                    {content && <InnerHTML>{content}</InnerHTML>}
                </Content>
            </Body>
        </Container>
    )
}

export default connect(getSpecialInformation)(SpecialInformation)
