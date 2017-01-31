import React, {PropTypes} from 'react'
import TerrainSummary from './TerrainSummary'

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
    alpine: PropTypes.object.isRequired,
    belowTreeline: PropTypes.object.isRequired,
    treeline: PropTypes.object.isRequired,
}
const titles = ['Alpine', 'Treeline', 'Below treeline']

export default function TerrainAndTravelAdvice({
    alpine,
    treeline,
    belowTreeline
}) {
    return (
        <div>
            <Introduction />
            {[alpine, treeline, belowTreeline].map((summary, index) => (
                <TerrainSummary key={index} title={titles[index]} {...summary} />
            ))}
        </div>
    )
}
