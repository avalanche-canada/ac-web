import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Container,
    Navbar,
    Header,
    Body,
    Content,
    Close,
} from 'components/page/drawer'
import { Status } from 'components/misc'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import * as Containers from 'prismic/containers'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'
import { geometry } from '@turf/helpers'
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
    renderHeader = ({ headline, locations }) => {
        const { onLocateClick } = this.props
        function handleLocateClick() {
            const { length } = locations
            const type = length === 1 ? 'Point' : 'MultiPoint'
            const coordinates =
                length === 1
                    ? parseLocation(locations[0])
                    : locations.map(parseLocation)

            onLocateClick(geometry(type, coordinates))
        }

        return (
            <h1>
                {headline}
                <DisplayOnMap onClick={handleLocateClick} />
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
    children = ({ document, status }) => (
        <Container>
            <Navbar>
                <Close onClick={this.props.onCloseClick} />
            </Navbar>
            <Header subject="Special Information">
                {document && this.renderHeader(document)}
            </Header>
            <Body>
                <Content>
                    <Status
                        {...status}
                        messages={this.createMessages(document)}
                    />
                    {document && this.renderMetadata(document)}
                    {document && this.renderLocation(document)}
                    {document && this.renderContent(document)}
                </Content>
            </Body>
        </Container>
    )
    render() {
        return (
            <Containers.SpecialInformation id={this.props.id}>
                {this.children}
            </Containers.SpecialInformation>
        )
    }
}
