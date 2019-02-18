import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Container,
    Body,
    Content,
    Navbar,
    Close,
} from 'components/page/drawer'
import { point } from '@turf/helpers'
import { Loading, Muted } from 'components/text'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { Document } from 'prismic/containers'
import { fatal } from 'prismic/params'
import { StructuredText } from 'prismic/components/base'
import DisplayOnMap from 'components/page/drawer/DisplayOnMap'

FatalAccident.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function FatalAccident({ id, onCloseClick, onLocateClick }) {
    return (
        <Document {...fatal.accident(id)}>
            {({ document, loading }) => (
                <Container>
                    <Navbar>
                        <Close onClick={onCloseClick} />
                    </Navbar>
                    <Header subject="Fatal Recreational Accident">
                        {document && (
                            <h1>
                                <span>{document.data.title}</span>
                                <DisplayOnMap
                                    onClick={() => {
                                        const {
                                            longitude,
                                            latitude,
                                        } = document.data.location

                                        onLocateClick(
                                            point([longitude, latitude])
                                        )
                                    }}
                                />
                            </h1>
                        )}
                    </Header>
                    <Body>
                        <Content>
                            {loading ? (
                                <Loading>
                                    Loading fatal recreational accident...
                                </Loading>
                            ) : document ? (
                                <Fragment>
                                    <Metadata>
                                        <Entry term="Accident date">
                                            <DateTime
                                                value={
                                                    document.data.dateOfAccident
                                                }
                                            />
                                        </Entry>
                                    </Metadata>
                                    <StructuredText
                                        value={document.data.content}
                                    />
                                </Fragment>
                            ) : (
                                <Muted>
                                    Fatal recreational accident "{id}" is not
                                    available anymore.
                                </Muted>
                            )}
                        </Content>
                    </Body>
                </Container>
            )}
        </Document>
    )
}
