import React, {PropTypes} from 'react'
import TerrainSummary from './TerrainSummary'
import Panel, {INVERSE} from 'components/panel'

function Introduction() {
    return (
        <div>
            <p>To minimize risk, always:</p>
            <ul>
                <li>Expose only one person at a time in avalanche terrain.</li>
                <li>Group up only in safe locations well away from avalanche runout zones.</li>
                <li>Avoid terrain traps whenever possible.</li>
            </ul>
            <p>And while this report is valid follow the travel advice below.</p>
        </div>
    )
}

TerrainAndTravelAdvice.propTypes = {
    report: PropTypes.object.isRequired,
}
const titles = ['Alpine', 'Treeline', 'Below treeline']

export default function TerrainAndTravelAdvice({report = {}}) {
    const summaries = [
        report.alpineTerrainAvoidance,
        report.treelineTerrainAvoidance,
        report.belowTreelineTerrainAvoidance
    ].filter(Boolean)

    if (summaries.length === 0) {
        return null
    }

    return (
        <Panel header='Terrain and Travel Advice' theme={INVERSE} expanded expandable>
            <Introduction />
            {summaries.map((summary, index) => (
                <TerrainSummary key={index} title={titles[index]} {...summary} />
            ))}
        </Panel>
    )
}
