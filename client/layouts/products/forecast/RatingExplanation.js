import React, { Fragment } from 'react'
import { Section, Header, Content } from 'components/explanation'
import Ratings, {
    EXTREME,
    NO_RATING,
    useTexts,
    useTravelAdvices,
    useLikehoodOfAvalanche,
    useSizeAndDistribution,
    Palette,
} from 'constants/forecast/rating'
import { WHITE, BLACK } from 'constants/forecast/palette'

export default function RatingExplanation() {
    const texts = useTexts()
    const travelAdvices = useTravelAdvices()
    const likehoodOfAvalanche = useLikehoodOfAvalanche()
    const sizeAndDistribution = useSizeAndDistribution()
    const ratings = Array.from(Ratings).filter(rating => rating !== NO_RATING)

    return (
        <Fragment>
            {ratings.map(rating => (
                <Section key={rating}>
                    <Header style={getStyle(rating)}>
                        {texts.get(rating)}
                    </Header>
                    <Content>
                        <p>{travelAdvices.get(rating)}</p>
                        <p>{likehoodOfAvalanche.get(rating)}</p>
                        <p>{sizeAndDistribution.get(rating)}</p>
                    </Content>
                </Section>
            ))}
        </Fragment>
    )
}

// Utils
function getStyle(rating) {
    return {
        color: rating === EXTREME ? WHITE : BLACK,
        backgroundColor: Palette.get(rating),
    }
}
