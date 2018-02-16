import React from 'react'
import StaticComponent from 'components/StaticComponent'
import { Section, Header, Content } from 'components/explanation'
import Panel from './Panel'
import LEVELS, {
    NOT_RECOMMENDED,
    PALETTE,
    TEXTS,
    DESCRIPTIONS,
} from 'constants/trip-planner'
import { WHITE, BLACK } from 'constants/forecast/palette'

export default class TerrainRatingsPanel extends StaticComponent {
    getStyle(level) {
        return {
            padding: '0.5em',
            margin: 0,
            color: level === NOT_RECOMMENDED ? WHITE : BLACK,
            backgroundColor: PALETTE.get(level),
        }
    }
    render() {
        return (
            <Panel header="Chart Explained">
                {Array.from(LEVELS).map(level => (
                    <Section key={level}>
                        <Header style={this.getStyle(level)}>
                            {TEXTS.get(level)}
                        </Header>
                        <Content>{DESCRIPTIONS.get(level)}</Content>
                    </Section>
                ))}
            </Panel>
        )
    }
}
