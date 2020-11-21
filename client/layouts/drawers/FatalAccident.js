import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import {
    Header,
    Body,
    Navbar,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import * as Async from 'contexts/async'
import { Loading, Muted } from 'components/text'
import { DateTime } from 'components/time'
import { Metadata, Entry } from 'components/metadata'
import { fatal } from 'prismic/params'
import { StructuredText } from 'prismic/components/base'
import { useDocument } from 'prismic/hooks'
import Shim from 'components/Shim'
import { useFlyTo, useSecondaryDrawer } from 'layouts/main/drawers/hooks'
import { useName } from 'constants/products/names'
import { ACCIDENT } from 'constants/products'

export default function FatalAccident() {
    const { close, id } = useSecondaryDrawer()

    return (
        <Async.Provider value={useDocument(fatal.accident(id))}>
            <Navbar>
                <Close onClick={close} />
            </Navbar>
            <Header subject={useName(ACCIDENT)}>
                <Async.Found>
                    <FatalAccidentHeader />
                </Async.Found>
            </Header>
            <Body>
                <Shim horizontal>
                    <Async.Pending>
                        <Loading>
                            <FormattedMessage
                                description="Layout drawers/FatalAccident"
                                defaultMessage="Loading fatal recreational accident..."
                            />
                        </Loading>
                    </Async.Pending>
                    <Async.Found>
                        <FatalAccidentBody />
                    </Async.Found>
                    <Async.NotFound>
                        <Muted>
                            <FormattedMessage
                                description="Layout drawers/FatalAccident"
                                defaultMessage="Fatal recreational accident {id} available anymore."
                                values={{ id }}
                            />
                        </Muted>
                    </Async.NotFound>
                </Shim>
            </Body>
        </Async.Provider>
    )
}

// Utils
function FatalAccidentHeader({ payload }) {
    const { title } = payload.data
    const flyTo = useFlyTo()
    function locate() {
        const { longitude, latitude } = payload.data.location

        flyTo([longitude, latitude])
    }

    return (
        <h1>
            <span>{title}</span>
            <DisplayOnMap onClick={locate} />
        </h1>
    )
}
function FatalAccidentBody({ payload }) {
    const { dateOfAccident, content } = payload.data
    const term = (
        <FormattedMessage
            defaultMessage="Accident Date"
            description="Layout drawers/FatalAccident"
        />
    )

    return (
        <Fragment>
            <Metadata>
                <Entry term={term}>
                    <DateTime value={dateOfAccident} />
                </Entry>
            </Metadata>
            <StructuredText value={content} />
        </Fragment>
    )
}
