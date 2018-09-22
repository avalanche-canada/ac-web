import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import {
    Header,
    Container,
    Body,
    Navbar,
    Close,
    Banner,
    Content,
} from 'components/page/drawer'
import { Ratio } from 'components/misc'
import { Loading, Muted } from 'components/text'
import * as cloudinary from 'services/cloudinary'
import { DATE } from 'utils/date'
import { StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { toyota } from 'prismic/params'

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

export default class ToyotaTruckReport extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
    }
    renderBanner(report) {
        return (
            <Ratio>
                {(width, height) => (
                    <Banner>
                        {report && (
                            <img
                                src={cloudinary.url(report.data.banner, {
                                    ...TRANSFORMATION,
                                    height,
                                    width,
                                })}
                                height={height}
                            />
                        )}
                    </Banner>
                )}
            </Ratio>
        )
    }
    renderHeader(report) {
        let subject = 'Toyota Truck Report'

        if (report) {
            subject = `${subject} for ${format(report.data.date, DATE)}`
        }

        return (
            <Header subject={subject}>
                {report && <h1>{report.data.headline}</h1>}
            </Header>
        )
    }
    renderContent({ content }) {
        return <StructuredText value={content} />
    }
    createMessages(loading, document) {
        return {
            isError:
                'An error happened while loading our latest Toyota truck report.',
            isLoading: 'Loading latest Toyota truck report...',
            isLoaded: document
                ? null
                : 'Toyota truck report not available anymore.',
        }.data
    }
    renderChildren = ({ document, loading }) => (
        <Fragment>
            {this.renderBanner(document)}
            {this.renderHeader(document)}
            <Content>
                {loading ? (
                    <Loading>Loading latest Toyota truck report...</Loading>
                ) : document ? (
                    this.renderContent(document.data)
                ) : (
                    <Muted>Toyota truck report not available anymore.</Muted>
                )}
            </Content>
            ,
        </Fragment>
    )
    render() {
        return (
            <Container>
                <Body>
                    <Navbar style={NAVBAR_STYLE}>
                        <Close shadow onClick={this.props.onCloseClick} />
                    </Navbar>
                    <Document {...toyota.truck(this.props.id)}>
                        {this.renderChildren}
                    </Document>
                </Body>
            </Container>
        )
    }
}
