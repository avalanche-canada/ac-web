import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import TerrainSummary from './TerrainSummary'
import styles from './HotZoneReport.css'

function Introduction() {
    return (
        <div>
            <p>To minimize risk, always:</p>
            <ul>
                <li>Expose only one person at a time in avalanche terrain.</li>
                <li>Group up only in safe locations well away from avalanche runout zones.</li>
                <li>Avoid terrain traps whenever possible.</li>
            </ul>
            <p>And while this report is valid:</p>
            <ul>
                <li>
                    <strong>AVOID</strong> terrain features marked with a <span styleName='Avoid'></span>
                </li>
                <li>Follow the travel advice below.</li>
            </ul>
        </div>
    )
}

Introduction = CSSModules(Introduction, styles)

TerrainAndTravelAdvice.propTypes = {
    alpine: PropTypes.object.isRequired,
    belowTreeline: PropTypes.object.isRequired,
    treeline: PropTypes.object.isRequired,
}
const titles = ['Alpine', 'Treeline', 'Below treeline']

export default function TerrainAndTravelAdvice({alpine, belowTreeline, treeline}) {
    return (
        <div>
            <Introduction />
            {[alpine, belowTreeline, treeline].map((summary, index) => (
                <TerrainSummary key={index} title={titles[index]} {...summary} />
            ))}
        </div>
    )
}
