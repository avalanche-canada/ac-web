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
import StructuredText from 'prismic/components/base/StructuredText'

export { Metadata }
export { Header }
export { ArchiveWarning }
export { Gallery }
export { TerrainAdviceSet }
export { TerrainAndTravelAdvice }
export { CriticalFactors }

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
            <FooterPanel uid="hot-zone-report-more-information" />
            <FooterPanel uid="hot-zone-report-about" />
        </Fragment>
    )
}

function FooterPanel({ uid }) {
    return (
        <Generic uid={uid}>
            {({ data }) => (
                <Panel header={data.title}>
                    <Shim horizontal>
                        <StructuredText value={data.body} />
                    </Shim>
                </Panel>
            )}
        </Generic>
    )
}
