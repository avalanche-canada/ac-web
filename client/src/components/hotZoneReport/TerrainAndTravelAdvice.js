import React from 'react'
import PropTypes from 'prop-types'
import TerrainSummary from './TerrainSummary'
import Panel, {INVERSE} from '/components/panel'
import AdviceText from './AdviceText'

TerrainAndTravelAdvice.propTypes = {
    report: PropTypes.object.isRequired,
}
const titles = ['Alpine', 'Treeline', 'Below treeline']

function TerrainAndTravelAdvice({report = {}}) {
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
            <AdviceText />
            {summaries.map((summary, index) => (
                <TerrainSummary key={index} title={titles[index]} {...summary} />
            ))}
        </Panel>
    )
}

export default TerrainAndTravelAdvice
