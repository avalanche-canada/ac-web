import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Header, Container, Body, Navbar, Close, Banner} from 'components/page/drawer'
import {Loading, Error, InnerHTML, Ratio} from 'components/misc'
import {Link} from 'react-router'
import Sponsor from 'containers/Sponsor'
import getToyotaTruckReport from 'selectors/prismic/toyotaTruckReport'
import cloudinary from 'services/cloudinary/cl'
import moment from 'moment'

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
    const subject = `Toyota Truck Report for ${moment(date).format('dddd MMMM Do')}`

    return (
        <Ratio>
            {(width, height) =>
                <Container>
                    <Banner url={cloudinary.url(banner, {...TRANSFORMATION, height, width})} style={{height}} />
                    <Navbar style={NAVBAR_STYLE}>
                        <Close onClick={() => onCloseClick()} />
                    </Navbar>
                    <Header subject={subject}>
                        <h1>{headline}</h1>
                    </Header>
                    <Body>
                        {isError && <Error>{messages.error}</Error>}
                        {isLoading && <Loading>{messages.loading}</Loading>}
                        {content && <InnerHTML>{content}</InnerHTML>}
                    </Body>
                </Container>
            }
        </Ratio>
    )
}

export default connect(getToyotaTruckReport)(ToyotaTruckReport)
