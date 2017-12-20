import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from 'components/page/drawer'
import { Ratio, Status } from 'components/misc'
import cloudinary from 'services/cloudinary/cl'
import format from 'date-fns/format'
import { DATE } from 'utils/date'
import { StructuredText } from 'prismic/components/base'
import * as Containers from 'prismic/containers'

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

export default class ToyotaTruckReport extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
    }
    renderBanner({ banner }) {
        return (
            <Ratio>
                {(width, height) => (
                    <Banner>
                        <img
                            src={cloudinary.url(banner, {
                                ...TRANSFORMATION,
                                height,
                                width,
                            })}
                            height={height}
                        />
                    </Banner>
                )}
            </Ratio>
        )
    }
    renderHeader(report) {
        let subject = 'Toyota Truck Report'

        if (report) {
            subject = `${subject} for ${format(report.date, DATE)}`
        }

        return (
            <Header subject={subject}>
                {report && <h1>{report.headline}</h1>}
            </Header>
        )
    }
    renderContent({ content }) {
        return <StructuredText value={content} />
    }
    children = ({ document, status }) => [
        document ? this.renderBanner(document) : null,
        this.renderHeader(document),
        <Content>
            <Status {...status} messages={messages} />
            {document && this.renderContent(document)}
        </Content>,
    ]
    render() {
        return (
            <Container>
                <Body style={BODY_STYLE}>
                    <Navbar style={NAVBAR_STYLE}>
                        <Close shadow onClick={this.props.onCloseClick} />
                    </Navbar>
                    <Containers.ToyotaTruckReport id={this.props.id}>
                        {this.children}
                    </Containers.ToyotaTruckReport>
                </Body>
            </Container>
        )
    }
}

const messages = {
    isError: 'An error happened while loading our latest Toyota truck report.',
    isLoading: 'Loading latest our Toyota truck report...',
}
