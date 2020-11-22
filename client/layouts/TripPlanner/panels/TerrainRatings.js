import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Entry, Symbol, Name, Description } from 'components/map/legend'
import Panel from './Panel'
import Ratings, {
    SIMPLE,
    COMPLEX,
    CHALLENGING,
    useRatingTexts,
    useRatingDescriptions,
} from 'constants/products/forecast/ates'
import atesStyles from 'styles/ates.css'

export default function TerrainRatingsPanel() {
    const header = (
        <FormattedMessage
            description="TripPlanner panels title"
            defaultMessage="Terrain Ratings Explained"
        />
    )

    return (
        <Panel header={header}>
            <Entries />
        </Panel>
    )
}

// Utils
export function Entries() {
    const texts = useRatingTexts()
    const descriptions = useRatingDescriptions()

    return Array.from(Ratings, rating => (
        <Entry key={rating}>
            <Symbol className={ATESClassNames.get(rating)}></Symbol>
            <Name>{texts.get(rating)}</Name>
            <Description>{descriptions.get(rating)}</Description>
        </Entry>
    ))
}

const ATESClassNames = new Map([
    [SIMPLE, atesStyles.simple],
    [COMPLEX, atesStyles.complex],
    [CHALLENGING, atesStyles.challenging],
])
