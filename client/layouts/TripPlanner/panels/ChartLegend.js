import React from 'react'
import { memo } from 'utils/react'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import LEVELS, { PALETTE, TEXTS, DESCRIPTIONS } from 'constants/trip-planner'

function TerrainRatingsPanel() {
    return (
        <Panel header="Chart legend">
            {Array.from(LEVELS).map(level => (
                <Entry key={level}>
                    <Symbol style={getStyle(level)} />
                    <Name>{TEXTS.get(level)}</Name>
                    <Description>{DESCRIPTIONS.get(level)}</Description>
                </Entry>
            ))}
        </Panel>
    )
}

export default memo.static(TerrainRatingsPanel)

// Utils
function getStyle(level) {
    return {
        backgroundColor: PALETTE.get(level),
    }
}
