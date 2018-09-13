import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Container,
    Navbar,
    Header,
    Body,
    Content,
    Close,
} from 'components/page/drawer'
import { Loading, Muted } from 'components/text'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { Document } from 'prismic/containers'
import { special } from 'prismic/params'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import * as turf from '@turf/helpers'
import { StructuredText } from 'prismic/components/base'

function parseLocation({ location: { longitude, latitude } }) {
    return [longitude, latitude]
}

export default class SpecialInformation extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onCloseClick: PropTypes.func.isRequired,
        onLocateClick: PropTypes.func.isRequired,
    }
    handleLocateClick = () => {
        const { locations } = this.document
        const { length } = locations
        const feature = length === 1 ? turf.point : turf.multiPoint
        const coordinates =
            length === 1
                ? parseLocation(locations[0])
                : locations.map(parseLocation)

        this.props.onLocateClick(feature(coordinates))
    }
    renderHeader = document => {
        this.document = document

        return (
            <h1>
                <span>{document.headline}</span>
                <DisplayOnMap onClick={this.handleLocateClick} />
            </h1>
        )
    }
    renderMetadata({ dateOfIssue, validUntil, dateUpdated }) {
        return (
            <Metadata>
                <Entry term="Date Issued">
                    <DateTime value={dateOfIssue} />
                </Entry>
                <Entry term="Valid Until">
                    {validUntil ? (
                        <DateTime value={validUntil} />
                    ) : (
                        'Further notice'
                    )}
                </Entry>
                {dateUpdated && (
                    <Entry term="Date Updated">
                        <DateTime value={dateUpdated} />
                    </Entry>
                )}
            </Metadata>
        )
    }
    renderLocation({ locationDescription }) {
        const style = {
            fontSize: '1.1em',
        }

        return <p style={style}>{locationDescription}</p>
    }
    renderContent({ content }) {
        return <StructuredText value={content} />
    }
    createMessages(report) {
        const { id } = this.props

        return {
            isError: 'An error happened while loading the special information.',
            isLoading: 'Loading latest special information...',
            isLoaded: report
                ? null
                : `Special information "${id}" is not available anymore.`,
        }
    }
    renderChildren = ({ document, loading }) => (
        <Container>
            <Navbar>
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Special Information">
                {document && this.renderHeader(document.data)}
            </Header>
            <Body>
                <Content>
                    {loading ? (
                        <Loading>Loading latest special information...</Loading>
                    ) : document ? (
                        <Fragment>
                            {this.renderMetadata(document.data)}
                            {this.renderLocation(document.data)}
                            {this.renderContent(document.data)}
                        </Fragment>
                    ) : (
                        <Muted>
                            {`Special information "${
                                this.props.id
                            }" is not available anymore.`}
                        </Muted>
                    )}
                </Content>
            </Body>
        </Container>
    )
    render() {
        return (
            <Document {...special.report(this.props.id)}>
                {this.renderChildren}
            </Document>
        )
    }
}
