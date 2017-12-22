import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TerrainSummary from './TerrainSummary'
import Panel, { INVERSE } from 'components/panel'
import AdviceText from './AdviceText'

export default class TerrainAndTravelAdvice extends PureComponent {
    static propTypes = {
        report: PropTypes.object.isRequired,
    }
    get summaries() {
        const { report } = this.props
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

        return [
            <TerrainSummary
                prefix="alpineTerrainAvoidance"
                title="Alpine"
                report={report}
            />,
            <TerrainSummary
                prefix="treelineTerrainAvoidance"
                title="Treeline"
                report={report}
            />,
            <TerrainSummary
                prefix="belowTreelineTerrainAvoidance"
                title="Below treeline"
                report={report}
            />,
        ]
    }
    render() {
        const { summaries } = this

        if (summaries === null) {
            return null
        }

        return (
            <Panel
                header="Terrain and Travel Advice"
                theme={INVERSE}
                expanded
                expandable>
                <AdviceText />
                {summaries}
            </Panel>
        )
    }
}
