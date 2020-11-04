import React from 'react'
import { useIntl } from 'react-intl'
import { useReport } from '../Context'
import Summary from '../Summary'

export default function TravelAndTerrainAdvice() {
    const report = useReport()
    const intl = useIntl()

    if (!report?.terrainAndTravelAdvice) {
        return null
    }

    const title = intl.formatMessage({
        defaultMessage: 'Travel and Terrain Advice',
    })

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
