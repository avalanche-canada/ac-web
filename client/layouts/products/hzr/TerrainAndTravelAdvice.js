import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from './Context'
import TerrainSummary from './TerrainSummary'
import AdviceText from './AdviceText'
import Panel from './Panel'

TerrainAndTravelAdviceComponent.propTypes = {
    report: PropTypes.object.isRequired,
}

function TerrainAndTravelAdviceComponent({ report }) {
    const {
        treelineTerrainAvoidanceTravelAdvice,
        belowTreelineTerrainAvoidanceTravelAdvice,
        alpineTerrainAvoidanceTravelAdvice,
    } = report
    const advices = [
        treelineTerrainAvoidanceTravelAdvice,
        belowTreelineTerrainAvoidanceTravelAdvice,
        alpineTerrainAvoidanceTravelAdvice,
    ].filter(Boolean)

    if (advices.length === 0) {
        return null
    }

    return (
        <Panel header="Terrain and Travel Advice" expanded>
            <AdviceText />
            <TerrainSummary
                prefix="alpineTerrainAvoidance"
                title="Alpine"
                report={report}
            />
            <TerrainSummary
                prefix="treelineTerrainAvoidance"
                title="Treeline"
                report={report}
            />
            <TerrainSummary
                prefix="belowTreelineTerrainAvoidance"
                title="Below treeline"
                report={report}
            />
        </Panel>
    )
}

export default function TerrainAndTravelAdvice() {
    return (
        <Consumer>
            {report =>
                report ? (
                    <TerrainAndTravelAdviceComponent report={report.data} />
                ) : null
            }
        </Consumer>
    )
}
