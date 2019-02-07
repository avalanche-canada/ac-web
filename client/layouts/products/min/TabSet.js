import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import Tabs, {
    HeaderSet,
    ColoredHeader,
    PanelSet,
    Panel,
} from 'components/tabs'
import Observation from './Observation'
import { INCIDENT, NAMES, TYPES, COLORS } from 'constants/min'

export default function TabSet() {
    return (
        <Consumer>
            {report =>
                report && Array.isArray(report.obs) ? (
                    <TabSetComponent
                        key={report.subid}
                        observations={report.obs}
                    />
                ) : null
            }
        </Consumer>
    )
}

// Components
TabSetComponent.propTypes = {
    observations: PropTypes.array.isRequired,
}

function TabSetComponent({ observations }) {
    return (
        <Tabs activeTab={getActiveTab(observations)}>
            <HeaderSet>
                {TYPES.map(type => (
                    <ColoredHeader
                        arrow
                        key={type}
                        disabled={!observations.some(FILTERS.get(type))}
                        color={COLORS.get(type)}>
                        {NAMES.get(type)}
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
