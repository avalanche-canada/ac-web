import React from 'react'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import LEVELS, {
    PALETTE,
    useTexts,
    useDescriptions,
} from 'constants/trip-planner'
import { FormattedMessage } from 'react-intl'

export default function ChartPanel() {
    const texts = useTexts()
    const descriptions = useDescriptions()
    const header = (
        <FormattedMessage
            description="Layout TripPlanner/panels/ChartLegend"
            defaultMessage="Chart legend"
        />
    )

    return (
        <Panel header={header}>
            {Array.from(LEVELS, level => (
                <Entry key={level}>
                    <Symbol style={getStyle(level)} />
                    <Name>{texts.get(level)}</Name>
                    <Description>{descriptions.get(level)}</Description>
                </Entry>
            ))}
        </Panel>
    )
}

// Utils
function getStyle(level) {
    return {
        backgroundColor: PALETTE.get(level),
    }
}
