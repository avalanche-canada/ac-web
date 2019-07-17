import React from 'react'
import PropTypes from 'prop-types'
import Panel from 'components/panel'
import Shim from 'components/Shim'
import { useReport } from './Context'
import TerrainSummary from './TerrainSummary'
import AdviceText from './AdviceText'

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
            <Shim horizontal>
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
            </Shim>
        </Panel>
    )
}

export default function TerrainAndTravelAdvice() {
    const report = useReport()

    return report ? (
        <TerrainAndTravelAdviceComponent report={report.data} />
    ) : null
}
