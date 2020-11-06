import React from 'react'
import PropTypes from 'prop-types'
import Panel from 'components/panel'
import Shim from 'components/Shim'
import { useReport } from './Context'
import TerrainSummary from './TerrainSummary'
import AdviceText from './AdviceText'
import { FormattedMessage } from 'react-intl'
import { useTexts, ALP, TLN, BTL } from 'constants/forecast/elevation'

TerrainAndTravelAdviceComponent.propTypes = {
    report: PropTypes.object.isRequired,
}

function TerrainAndTravelAdviceComponent({ report }) {
    const ratings = useTexts()
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
        <Panel
            header={
                <FormattedMessage
                    description="Layout products/hzr/TerrainAdviceAdvice"
                    defaultMessage="Terrain and Travel Advice"
                />
            }
            expanded>
            <Shim horizontal>
                <AdviceText />
                {Array.from(ratings, ([rating, title]) => (
                    <TerrainSummary
                        key={rating}
                        prefix={keys.get(rating)}
                        title={title}
                        report={report}
                    />
                ))}
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
const keys = new Map([
    [ALP, 'alpineTerrainAvoidance'],
    [TLN, 'treelineTerrainAvoidance'],
    [BTL, 'belowTreelineTerrainAvoidance'],
])
