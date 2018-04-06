import React, { Fragment, createContext } from 'react'
import Panel from './Panel'
import Generic from 'prismic/components/Generic'
import isWithinRange from 'date-fns/is_within_range'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'

import MetadataComponent from './Metadata'
import Headline from './Headline'
import Title from './Title'
import ArchiveWarningComponent from './ArchiveWarning'
import CriticalFactorsComponent from './CriticalFactors'
import TerrainAndTravelAdviceComponent from './TerrainAndTravelAdvice'
import TerrainAdviceSetComponent from './TerrainAdviceSet'
import GalleryComponent from './Gallery'

export Sidebar from './Sidebar'

const { Provider, Consumer } = createContext()

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

export function Metadata(props) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <MetadataComponent
                        {...props}
                        dateOfIssue={report.dateOfIssue}
                        validUntil={report.validUntil}
                        dateUpdated={report.dateUpdated}
                    />
                ) : null
            }
        </Consumer>
    )
}

export function Header(props) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <Fragment>
                        <Title {...props}>{report.title}</Title>
                        <Headline {...props}>{report.headline}</Headline>
                    </Fragment>
                ) : null
            }
        </Consumer>
    )
}

export function ArchiveWarning(props) {
    return (
        <Consumer>
            {report =>
                report &&
                !isWithinRange(
                    new Date(),
                    startOfDay(report.dateOfIssue),
                    endOfDay(report.validUntil)
                ) ? (
                    <ArchiveWarningComponent
                        {...props}
                        region={report.region}
                    />
                ) : null
            }
        </Consumer>
    )
}

export function Gallery(props) {
    return (
        <Consumer>
            {report =>
                report &&
                Array.isArray(report.hotzoneImages) &&
                report.hotzoneImages.length > 0 ? (
                    <GalleryComponent
                        {...props}
                        images={report.hotzoneImages}
                    />
                ) : null
            }
        </Consumer>
    )
}

export function CriticalFactors(props) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <CriticalFactorsComponent {...props} {...report} />
                ) : null
            }
        </Consumer>
    )
}

export function TerrainAndTravelAdvice(props) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <TerrainAndTravelAdviceComponent
                        {...props}
                        report={report}
                    />
                ) : null
            }
        </Consumer>
    )
}

export function TerrainAdviceSet(props) {
    return (
        <Consumer>
            {report =>
                report ? (
                    <TerrainAdviceSetComponent {...props} {...report} />
                ) : null
            }
        </Consumer>
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
