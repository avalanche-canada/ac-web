import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Body,
    Navbar,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import { point } from '@turf/helpers'
import { Loading, Muted } from 'components/text'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { fatal } from 'prismic/params'
import { StructuredText } from 'prismic/components/base'
import { useDocument } from 'prismic/hooks'
import Shim from 'components/Shim'
import { FormattedMessage, useIntl } from 'react-intl'

FatalAccident.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseClick: PropTypes.func.isRequired,
    onLocateClick: PropTypes.func.isRequired,
}

export default function FatalAccident({ id, onCloseClick, onLocateClick }) {
    const [document, pending] = useDocument(fatal.accident(id))
    const intl = useIntl()

    return (
        <Fragment>
            <Navbar>
                <Close onClick={onCloseClick} />
            </Navbar>
            <Header
                subject={intl.formatMessage({
                    defaultMessage: 'Fatal Recreational Accident',
                    description: 'Layout drawers/FatalAccident',
                })}>
                {document && (
                    <h1>
                        <span>{document.data.title}</span>
                        <DisplayOnMap
                            onClick={() => {
                                const {
                                    longitude,
                                    latitude,
                                } = document.data.location

                                onLocateClick(point([longitude, latitude]))
                            }}
                        />
                    </h1>
                )}
            </Header>
            <Body>
                <Shim horizontal>
                    {pending ? (
                        <Loading>
                            <FormattedMessage
                                description="Layout drawers/FatalAccident"
                                defaultMessage="Loading fatal recreational accident..."
                            />
                        </Loading>
                    ) : document ? (
                        <Fragment>
                            <Metadata>
                                <Entry
                                    term={intl.formatMessage({
                                        defaultMessage: 'Accident Date',
                                        description:
                                            'Layout drawers/FatalAccident',
                                    })}>
                                    <DateTime
                                        value={document.data.dateOfAccident}
                                    />
                                </Entry>
                            </Metadata>
                            <StructuredText value={document.data.content} />
                        </Fragment>
                    ) : (
                                <Muted>
                                    <FormattedMessage
                                        description="Layout drawers/FatalAccident"
                                        defaultMessage="Fatal recreational accident {id} available anymore."
                                        values={{
                                            id
                                        }}
                                    />
                                </Muted>
                            )}
                </Shim>
            </Body>
        </Fragment>
    )
}
