import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Header, Container, Body, Navbar, Close, Banner, Content} from 'components/page/drawer'
import {Loading, Error, InnerHTML, Ratio} from 'components/misc'
import {Link} from 'react-router'
import Sponsor from 'containers/Sponsor'
import getToyotaTruckReport from 'selectors/prismic/toyotaTruckReport'
import cloudinary from 'services/cloudinary/cl'
import format from 'date-fns/format'

const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}

const TRANSFORMATION = {
    width: 500,
    height: 250,
    crop: 'fill',
}

const BODY_STYLE = {
    padding: 0,
}

function ToyotaTruckReport({
    report = {},
    isLoading,
    isError,
    messages,
    onCloseClick,
}) {
    const {
        headline,
        content,
        date,
        banner,
    } = report
    let subject = 'Toyota Truck Report'

    if (date) {
        subject = `${subject} for ${format(date, 'dddd MMMM Do')}`
    }

    return (
        <Container>
            <Body style={BODY_STYLE}>
                <Navbar style={NAVBAR_STYLE}>
                    <Close onClick={() => onCloseClick()} />
                </Navbar>
                <Ratio>
                {(width, height) =>
                    <Banner url={cloudinary.url(banner, {...TRANSFORMATION, height, width})} style={{height}} />
                }
                </Ratio>
                <Header subject={subject}>
                    <h1>{headline}</h1>
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

export default connect(getToyotaTruckReport)(ToyotaTruckReport)
