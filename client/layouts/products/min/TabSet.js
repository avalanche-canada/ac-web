import React from 'react'
import PropTypes from 'prop-types'
import { useReport } from './Context'
import Tabs, {
    HeaderSet,
    ColoredHeader,
    PanelSet,
    Panel,
} from 'components/tabs'
import Observation from './Observation'
import { INCIDENT, TYPES, COLORS, useNames } from 'constants/min'

export default function TabSet() {
    const report = useReport()

    return report && Array.isArray(report.obs) ? (
        <TabSetComponent key={report.subid} observations={report.obs} />
    ) : null
}

// Components
TabSetComponent.propTypes = {
    observations: PropTypes.array.isRequired,
}

function TabSetComponent({ observations }) {
    const names = useNames()

    return (
        <Tabs activeTab={getActiveTab(observations)}>
            <HeaderSet>
                {Array.from(names, ([type, name]) => (
                    <ColoredHeader
                        arrow
                        key={type}
                        disabled={!observations.some(FILTERS.get(type))}
                        color={COLORS.get(type)}>
                        {name}
                    </ColoredHeader>
                ))}
            </HeaderSet>
            <PanelSet>
                {TYPES.map(type => {
                    const filter = FILTERS.get(type)

                    if (!observations.some(filter)) {
                        return null
                    }

                    const { ob } = observations.find(filter)

                    return (
                        <Panel key={type}>
                            <Observation type={type} observation={ob} />
                        </Panel>
                    )
                })}
            </PanelSet>
        </Tabs>
    )
}

// Constants and utils
function getActiveTab(observations) {
    const hasIncident = observations.some(FILTERS.get(INCIDENT))
    const firstType = TYPES.find(type => observations.some(FILTERS.get(type)))

    return TYPES.indexOf(hasIncident ? INCIDENT : firstType)
}
const FILTERS = new Map(
    TYPES.map(type => [type, observation => observation.obtype === type])
)
