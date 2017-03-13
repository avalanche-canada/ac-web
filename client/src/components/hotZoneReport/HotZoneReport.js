import React, {PropTypes} from 'react'
import {withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import BasePanel, {INVERSE} from 'components/panel'
import Generic from 'prismic/components/Generic'
import CriticalFactors from './CriticalFactors'
import TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
import TerrainAdviceSet from './TerrainAdviceSet'
import Metadata from './Metadata'
import ImageGallery from 'react-image-gallery'
import styles from './HotZoneReport.css'
import Alert, {WARNING} from 'components/alert'
import {isHotZoneReportValid} from 'prismic/utils'

const Panel = withProps({
    theme: INVERSE,
    expandable: true,
})(BasePanel)

HotZoneReport.propTypes = {
    report: PropTypes.object,
}

function HotZoneReport({report}) {
    let gallery = null

    if (report) {
        const images = report.images.map(({url, caption}) => ({
            original: url,
            description: caption,
        }))

        gallery = images.length > 0 && {
            items: images,
            showBullets: images.length > 1,
            showPlayButton: images.length > 1,
            showThumbnails: false,
        }
    }

    return (
        <div styleName='HotZoneReport'>
            {(report && !isHotZoneReportValid(report)) &&
                <Alert type={WARNING}>
                    This is an archived HotZone report
                    <Link to={`/hot-zone-reports/${report.region}`}>
                        Read today's report
                    </Link>
                </Alert>
            }
            {(report && report.title) &&
                <div styleName='Title'>
                    {report.title}
                </div>
            }
            {(report && report.headline) &&
                <div styleName='Headline'>
                    {report.headline}
                </div>
            }
            {gallery && <ImageGallery {...gallery} />}
            <CriticalFactors report={report} />
            <TerrainAndTravelAdvice report={report} />
            <TerrainAdviceSet report={report} />
            {!report &&
                <Panel header='More information' expanded>
                    <Generic uid='hot-zone-report-more-information' />
                </Panel>
            }
            <Panel header='About'>
                <Generic uid='hot-zone-report-about' />
            </Panel>
        </div>
    )
}

export default CSSModules(HotZoneReport, styles)
