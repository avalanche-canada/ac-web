import React, {PropTypes} from 'react'
import {withProps} from 'recompose'
import BasePanel, {INVERSE} from 'components/panel'
import Generic from 'prismic/components/Generic'
import CriticalFactors from './CriticalFactors'
import TerrainAndTravelAdvice from './TerrainAndTravelAdvice'
import Metadata from './Metadata'

const Panel = withProps({
    theme: INVERSE,
    expandable: true,
})(BasePanel)

HotZoneReport.propTypes = {
    report: PropTypes.object,
}

export default function HotZoneReport({report}) {
    return (
        <div>
            {report &&
                <Panel header='Critical Factors Summary'>
                    <p>
                        <strong>
                            Critical factors influence avalanche hazard. The more critical factors, the greater the potential for avalanches.
                        </strong>
                    </p>
                    <CriticalFactors />
                </Panel>
            }
            {report &&
                <Panel header='Terrain and Travel Advice'>
                    <TerrainAndTravelAdvice />
                </Panel>
            }
            {report ||
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
