import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { useReport } from 'hooks/async/mcr'
import * as Async from 'contexts/async'
import { Loading, Muted } from 'components/text'
import { InnerHTML } from 'components/misc'
import { Locate } from 'components/button'
import { Header, Body, Navbar, Close, Banner } from 'components/page/drawer'
import {
    Footer,
    Submitter,
    DateSet,
    Location,
    Media,
} from 'layouts/products/mcr'
import { useFlyTo, useSecondaryDrawer } from 'layouts/main/drawers/hooks'
import Shim from 'components/Shim'
import { WHITE } from 'constants/colors'
import { useName } from 'constants/products/names'
import { MOUNTAIN_CONDITIONS_REPORT } from 'constants/products'

export default function MountainConditionsReport() {
    const { close, id } = useSecondaryDrawer()

    return (
        <Async.Provider value={useReport(id)}>
            <Body>
                <Navbar style={NAVBAR_STYLE}>
                    <Close shadow onClick={close} style={CLOSE_BUTTON_STYLE} />
                </Navbar>
                <Banner>
                    <Async.Payload>
                        {payload => <Media images={payload?.images} />}
                    </Async.Payload>
                </Banner>
                <Header subject={useName(MOUNTAIN_CONDITIONS_REPORT)}>
                    <Async.Found>
                        <MountainConditionHeader />
                    </Async.Found>
                </Header>
                <Shim horizontal>
                    <Async.Pending>
                        <Loading>
                            <FormattedMessage
                                description="Layout drawers/MountainConditionsReport"
                                defaultMessage="Loading Mountain Conditions Report..."
                            />
                        </Loading>
                    </Async.Pending>
                    <Async.Found>
                        <MountainConditionBody></MountainConditionBody>
                    </Async.Found>
                    <Async.NotFound>
                        <Muted>
                            <FormattedMessage
                                description="Layout drawers/MountainConditionsReport"
                                defaultMessage="Report #{id} is not available anymore."
                                values={{ id }}
                            />
                        </Muted>
                    </Async.NotFound>
                    <Footer />
                </Shim>
            </Body>
        </Async.Provider>
    )
}

function MountainConditionHeader({ payload }) {
    const flyTo = useFlyTo()
    const {
        title,
        permalink,
        dates,
        location,
        location_desc,
        user,
        groups,
    } = payload
    function locate() {
        flyTo(location)
    }

    return (
        <Fragment>
            <h1>
                <a href={permalink} target={permalink}>
                    {title}
                </a>
                <Locate onClick={locate} />
            </h1>
            <DateSet values={dates} />
            <Location>{location_desc}</Location>
            <Submitter {...user} groups={groups} />
        </Fragment>
    )
}
function MountainConditionBody({ payload }) {
    return <InnerHTML>{payload.body}</InnerHTML>
}
const NAVBAR_STYLE = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}
const CLOSE_BUTTON_STYLE = {
    backgroundColor: WHITE,
}
