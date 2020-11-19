import React, { Fragment } from 'react'
import { Link } from '@reach/router'
import * as Async from 'contexts/async'
import * as Hzr from 'layouts/products/hzr'
import {
    Navbar,
    Header,
    Body,
    Close,
    DisplayOnMap,
} from 'components/page/drawer'
import { Loading, Warning } from 'components/text'
import Shim from 'components/Shim'
import Sponsor from 'layouts/Sponsor'
import { useAdvisoryMetadata } from 'hooks/async/features'
import { hotZone } from 'prismic/params'
import { useDocument } from 'prismic/hooks'
import { FormattedMessage } from 'react-intl'
import { useFitBounds, usePrimaryDrawer } from 'layouts/main/drawers/hooks'

export default function HotZoneReportDrawer() {
    const { id, close } = usePrimaryDrawer()
    const metadata = useAdvisoryMetadata(id)
    const report = useDocument(hotZone.report(id))
    const subject = (
        <FormattedMessage
            defaultMessage="Avalanche Advisory"
            description="Layout drawers/HotZoneReport"
        />
    )

    return (
        <Fragment>
            <Navbar>
                <Sponsor label={null} />
                <Close onClick={close} />
            </Navbar>
            <Header subject={subject}>
                <Async.Provider value={metadata}>
                    <Async.Found>
                        <AdvisoryHeader />
                    </Async.Found>
                    <Async.Pending>
                        <Loading as="h1" />
                    </Async.Pending>
                </Async.Provider>
            </Header>
            <Body>
                <Async.Provider value={report}>
                    <Async.Pending>
                        <Shim horizontal>
                            <Loading />
                        </Shim>
                    </Async.Pending>
                    <Async.Found>
                        <AdvisoryBody />
                    </Async.Found>
                    <Async.Empty>
                        <Warning>
                            <FormattedMessage
                                defaultMessage="No {name} Avalanche Advisory is currently available."
                                description="Layout drawers/HotZoneReport"
                                values={{ name: id }}
                            />
                        </Warning>
                    </Async.Empty>
                </Async.Provider>
            </Body>
        </Fragment>
    )
}

// Utils
function AdvisoryHeader({ payload }) {
    const { id, name, bbox } = payload
    const fitBounds = useFitBounds()
    function locate() {
        fitBounds(bbox)
    }

    return (
        <h1>
            <Link to={'/advisories/' + id}>{name}</Link>
            <DisplayOnMap onClick={locate} />
        </h1>
    )
}
function AdvisoryBody({ payload }) {
    return (
        <Hzr.Report value={payload.data}>
            <Shim horizontal>
                <Hzr.Metadata shareable />
                <Hzr.Header />
            </Shim>
            <Hzr.Gallery />
            <Hzr.CriticalFactors />
            <Hzr.TerrainAndTravelAdvice />
            <Hzr.TerrainAdviceSet />
            <Hzr.Footer />
        </Hzr.Report>
    )
}
