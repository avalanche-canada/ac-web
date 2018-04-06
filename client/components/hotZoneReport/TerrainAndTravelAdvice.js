import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import TerrainSummary from './TerrainSummary'
import AdviceText from './AdviceText'
import Panel from './Panel'

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

        return (
            <Fragment>
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
            </Fragment>
        )
    }
    render() {
        const { summaries } = this

        if (summaries === null) {
            return null
        }

        return (
            <Panel header="Terrain and Travel Advice" expanded>
                <AdviceText />
                {summaries}
            </Panel>
        )
    }
}
