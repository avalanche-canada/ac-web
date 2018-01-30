import React from 'react'
import StaticComponent from 'components/StaticComponent'
import { Section, Header, Content } from 'components/explanation'
import Panel from './Panel'
import { WHITE, BLACK } from 'constants/forecast/palette'

export default class TerrainRatingsPanel extends StaticComponent {
    getStyle(index) {
        return {
            padding: '0.5em',
            margin: 0,
            color: index === 1 ? BLACK : WHITE,
            backgroundColor: COLORS[index],
        }
    }
    render() {
        return (
            <Panel header="Chart Explained">
                {TEXTS.map((text, index) => (
                    <Section key={index}>
                        <Header style={this.getStyle(index)}>{text}</Header>
                        <Content>{DESCRIPTIONS[index]}</Content>
                    </Section>
                ))}
            </Panel>
        )
    }
}

// Constants
const COLORS = ['#EC2227', '#FCEE23', '#12B24B']
const TEXTS = ['Not recommended', 'Extra caution', 'Caution']
const DESCRIPTIONS = [
    <p>
        Backcountry travel in the red area is <b>NOT RECOMMENDED</b> without
        professional–level safety systems and guidance. Conditions are primed
        for avalanche accidents and even careful decisions can result in serious
        accidents. Finding terrain with an acceptable level of avalanche risk
        under these conditions requires detailed knowledge and comprehensive
        understanding of the development of the local snowpack to date, the
        effect of the current weather on the existing avalanche problem, and the
        small- scale characteristics of the local terrain, including avalanche
        activity history.
    </p>,
    <p>
        Use <b>EXTRA CAUTION</b> in the yellow area. Avalanches are likely to
        occur with human or natural triggers, and accidents are frequent. Safe
        travelling under these conditions demands an advanced understanding of
        the character of the current avalanche problem. This includes knowing
        which field observations are most useful under the given conditions and
        which terrain features to favour or avoid. Advanced trip planning and
        group management skills, significant personal experience, and humility
        are essential.
    </p>,
    <p>
        Conditions in the green area are appropriate for informed backcountry
        travel in avalanche terrain and accidents are generally infrequent. Use
        <b>CAUTION</b>, including hazard recognition and safe travel skills as
        taught in introductory avalanche courses. Rescue skills are always
        essential when travelling in avalanche terrain.
    </p>,
]
