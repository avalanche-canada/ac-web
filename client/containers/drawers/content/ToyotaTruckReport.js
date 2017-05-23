import React from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from '~/components/page/drawer'
import { Ratio, Status } from '~/components/misc'
import cloudinary from '~/services/cloudinary/cl'
import format from 'date-fns/format'
import { toyotaTruckReport } from '~/containers/connectors'
import { parse } from '~/prismic'
import { StructuredText } from '~/prismic/components/base'

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

ToyotaTruckReport.propTypes = {
    report: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    onCloseClick: PropTypes.func.isRequired,
}

function ToyotaTruckReport({ report, status, onCloseClick }) {
    const { data: { headline, content, date, banner } } = parse(report)
    let subject = 'Toyota Truck Report'

    if (date) {
        subject = `${subject} for ${format(date, 'dddd MMMM D')}`
    }

    return (
        <Container>
            <Body style={BODY_STYLE}>
                <Navbar style={NAVBAR_STYLE}>
                    <Close shadow onClick={onCloseClick} />
                </Navbar>
                <Ratio>
                    {(width, height) => (
                        <Banner
                            url={cloudinary.url(banner, {
                                ...TRANSFORMATION,
                                height,
                                width,
                            })}
                            style={{ height }}
                        />
                    )}
                </Ratio>
                <Header subject={subject}>
                    <h1>{headline}</h1>
                </Header>
                <Content>
                    <Status {...status.toJSON()} />
                    <StructuredText value={content} />
                </Content>
            </Body>
        </Container>
    )
}

export default toyotaTruckReport(ToyotaTruckReport)
