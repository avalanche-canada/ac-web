import React, {PropTypes} from 'react'
import {withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import BasePanel, {INVERSE} from 'components/panel'
import Generic from 'prismic/components/Generic'
import CriticalFactors from './CriticalFactors'
import TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
import Metadata from './Metadata'
import {Gallery} from 'components/gallery'
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
        const {thumbs = [], uploads = []} = report

        images = uploads.map((upload, index) => ({
            original: upload,
            thumbnail: thumbs[index],
        }))
    }

    return (
        <div styleName='HotZoneReport'>
            {images.length > 1 * 1000 &&
                <Gallery images={images} />
            }
            {report &&
                <Panel header='Critical Factors Summary'>
                    <p>
                        <strong>
                            Critical factors influence avalanche hazard. The more critical factors, the greater the potential for avalanches.
                        </strong>
                    </p>
                    <CriticalFactors {...report.data.criticalFactors} />
                </Panel>
            }
            {report &&
                <Panel header='Terrain and Travel Advice'>
                    <TerrainAndTravelAdvice
                        alpine={report.data.alpineTerrainAvoidance}
                        belowTreeline={report.data.belowTreelineTerrainAvoidance}
                        treeline={report.data.treelineTerrainAvoidance} />
                </Panel>
            }
            {!report &&
                <Panel header='More information'>
                    <Generic bookmark='hot-zone-report-more-information' />
                </Panel>
            }
            <Panel header='About'>
                <Generic bookmark='hot-zone-report-about' />
            </Panel>
        </div>
    )
}

export default CSSModules(HotZoneReport, styles)
