import React, { Fragment } from 'react'
import Panel from './Panel'
import { Generic } from 'prismic/components'
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
                <Generic uid="hot-zone-report-more-information" />
            </Panel>
            <Panel header="About">
                <Generic uid="hot-zone-report-about" />
            </Panel>
        </Fragment>
    )
}
