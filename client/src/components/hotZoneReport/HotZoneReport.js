import React, {PropTypes} from 'react'
import {withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import BasePanel, {INVERSE} from 'components/panel'
import Generic from 'prismic/components/Generic'
import CriticalFactors from './CriticalFactors'
import TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
import Metadata from './Metadata'
import ImageGallery from 'react-image-gallery'
import styles from './HotZoneReport.css'

const Panel = withProps({
    theme: INVERSE,
    expandable: true,
})(BasePanel)

HotZoneReport.propTypes = {
    report: PropTypes.object,
}

function HotZoneReport({report}) {
    let images = []

    if (report) {
        images = report.images.map(({url}) => ({
            original: url,
        }))
    }

    return (
        <div styleName='HotZoneReport'>
            {Boolean(images.length) && <ImageGallery items={images} showBullets showThumbnails={false} />}
            {report &&
                <Panel header='Critical Factors Summary' expanded>
                    <p>
                        <strong>
                            Critical factors influence avalanche hazard. The more critical factors, the greater the potential for avalanches.
                        </strong>
                    </p>
                    <div styleName='CriticalFactors'>
                        <CriticalFactors {...report.criticalFactors} />
                    </div>
                </Panel>
            }
            {report &&
                <Panel header='Terrain and Travel Advice' expanded>
                    <TerrainAndTravelAdvice
                        alpine={report.alpineTerrainAvoidance}
                        belowTreeline={report.belowTreelineTerrainAvoidance}
                        treeline={report.treelineTerrainAvoidance} />
                </Panel>
            }
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
