import React from 'react'
import StaticComponent from 'components/StaticComponent'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import LEVELS, { PALETTE, TEXTS, DESCRIPTIONS } from 'constants/trip-planner'

export default class TerrainRatingsPanel extends StaticComponent {
    getStyle(level) {
        return {
            backgroundColor: PALETTE.get(level),
        }
    }
    render() {
        return (
            <Panel header="Chart legend">
                {Array.from(LEVELS).map(level => (
                    <Entry key={level}>
                        <Symbol style={this.getStyle(level)} />
                        <Name>{TEXTS.get(level)}</Name>
                        <Description>{DESCRIPTIONS.get(level)}</Description>
                    </Entry>
                ))}
            </Panel>
        )
    }
}
