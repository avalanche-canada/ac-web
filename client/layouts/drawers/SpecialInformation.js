import React, { Fragment } from 'react'
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

SpecialInformation.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function SpecialInformation({
    id,
    onCloseClick,
    onLocateClick,
}) {
    return (
        <Document {...special.report(id)}>
            {({ document, loading }) => (
                <Container>
                    <Navbar>
                        <Close onClick={onCloseClick} />
                    </Navbar>
                    <Header subject="Special Information">
                        {document && (
                            <h1>
                                <span>{document.headline}</span>
                                <DisplayOnMap
                                    onClick={() => {
                                        const { locations } = document
                                        const { length } = locations
                                        const feature =
                                            length === 1
                                                ? turf.point
                                                : turf.multiPoint
                                        const coordinates =
                                            length === 1
                                                ? parseLocation(locations[0])
                                                : locations.map(parseLocation)

                                        onLocateClick(feature(coordinates))
                                    }}
                                />
                            </h1>
                        )}
                    </Header>
                    <Body>
                        <Content>
                            {loading ? (
                                <Loading>
                                    Loading latest special information...
                                </Loading>
                            ) : document ? (
                                <Fragment>
                                    {renderMetadata(document.data)}
                                    {renderLocation(document.data)}
                                    {renderContent(document.data)}
                                </Fragment>
                            ) : (
                                <Muted>
                                    {`Special information "${id}" is not available anymore.`}
                                </Muted>
                            )}
                        </Content>
                    </Body>
                </Container>
            )}
        </Document>
    )
}

// Utils
function renderMetadata({ dateOfIssue, validUntil, dateUpdated }) {
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
function renderLocation({ locationDescription }) {
    const style = {
        fontSize: '1.1em',
    }

    return <p style={style}>{locationDescription}</p>
}
function renderContent({ content }) {
    return <StructuredText value={content} />
}
function parseLocation({ location: { longitude, latitude } }) {
    return [longitude, latitude]
}
