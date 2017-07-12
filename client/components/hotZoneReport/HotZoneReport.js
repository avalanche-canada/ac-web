import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Panel, { INVERSE } from '~/components/panel'
import Generic from '~/prismic/components/Generic'
import CriticalFactors from './CriticalFactors'
import TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
import TerrainAdviceSet from './TerrainAdviceSet'
import ImageGallery from '~/components/gallery'
import styles from './HotZoneReport.css'
import ArchiveWarning from './ArchiveWarning'

HotZoneReport.propTypes = {
    report: PropTypes.object,
    previous: PropTypes.object,
    next: PropTypes.object,
}

function HotZoneReport({ report, previous, next }) {
    const { title, headline, images } = report || {}
    let gallery = null
    const panel = {
        theme: INVERSE,
        expandable: true,
    }

    if (images) {
        gallery = images.length > 0 && {
            items: images.map(({ main, caption }) => ({
                original: main.url,
                description: caption,
            })),
            showBullets: images.length > 1,
            showPlayButton: images.length > 1,
            showThumbnails: false,
        }
    }
    return (
        <div styleName="HotZoneReport">
            <ArchiveWarning report={report} next={next} previous={previous} />
            {title &&
                <div styleName="Title">
                    {title}
                </div>}
            {headline &&
                <div styleName="Headline">
                    {headline}
                </div>}
            {gallery && <ImageGallery {...gallery} />}
            <CriticalFactors report={report} />
            <TerrainAndTravelAdvice report={report} />
            <TerrainAdviceSet report={report} />
            <Panel {...panel} header="More information">
                <Generic uid="hot-zone-report-more-information" />
            </Panel>
            <Panel {...panel} header="About">
                <Generic uid="hot-zone-report-about" />
            </Panel>
        </div>
    )
}

export default CSSModules(HotZoneReport, styles)
