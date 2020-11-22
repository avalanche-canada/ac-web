import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useReport } from './Context'
import Summary from './Summary'

export default function TravelAndTerrainAdvice() {
    const report = useReport()

    if (!report?.terrainAndTravelAdvice) {
        return null
    }

    const title = (
        <FormattedMessage defaultMessage="Travel and Terrain Advice" />
    )

    return (
        <Summary title={title}>
            <ul>
                {report.terrainAndTravelAdvice.map(statement => (
                    <li key={statement}>{statement}</li>
                ))}
            </ul>
        </Summary>
    )
}
