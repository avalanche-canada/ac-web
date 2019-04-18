import React, { Fragment } from 'react'
import Panel from 'components/panel'
import Shim from 'components/Shim'
import { Generic } from 'prismic/layouts'
import { Provider } from './Context'

import Metadata from './Metadata'
import Header from './Header'
import ArchiveWarning from './ArchiveWarning'
import Gallery from './Gallery'
import TerrainAdviceSet from './TerrainAdviceSet'
import TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
import CriticalFactors from './CriticalFactors'

export Metadata from './Metadata'
export Header from './Header'
export ArchiveWarning from './ArchiveWarning'
export Gallery from './Gallery'
export TerrainAdviceSet from './TerrainAdviceSet'
export TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
export CriticalFactors from './CriticalFactors'

export Sidebar from './Sidebar'

export function Report({ children, value }) {
    return (
        <Provider value={value}>
            {children || (
                <Fragment>
                    <Metadata />
                    <ArchiveWarning />
                    <Header />
                    <Gallery />
                    <CriticalFactors />
                    <TerrainAndTravelAdvice />
                    <TerrainAdviceSet />
                    <Footer />
                </Fragment>
            )}
        </Provider>
    )
}

export function Footer() {
    return (
        <Fragment>
            <Panel header="More information">
                <Shim horizontal>
                    <Generic uid="hot-zone-report-more-information" />
                </Shim>
            </Panel>
            <Panel header="About">
                <Shim horizontal>
                    <Generic uid="hot-zone-report-about" />
                </Shim>
            </Panel>
        </Fragment>
    )
}
