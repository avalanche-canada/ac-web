import React, { Fragment } from 'react'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import LEVELS, { PALETTE, TEXTS, DESCRIPTIONS } from 'constants/trip-planner'

export default function ChartPanel() {
    return (
        <Panel header="Chart legend">
            <Entries />
        </Panel>
    )
}

// Utils
function Entries() {
    return (
        <Fragment>
            {Array.from(LEVELS, level => (
                <Entry key={level}>
                    <Symbol style={getStyle(level)} />
                    <Name>{TEXTS.get(level)}</Name>
                    <Description>{DESCRIPTIONS.get(level)}</Description>
                </Entry>
            ))}
        </Fragment>
    )
}
function getStyle(level) {
    return {
        backgroundColor: PALETTE.get(level),
    }
}
