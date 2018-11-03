import React, { Fragment } from 'react'
import { memo } from 'utils/react'
import { Section, Header, Content } from 'components/explanation'
import Ratings, {
    EXTREME,
    NO_RATING,
    Texts,
    TravelAdvices,
    LikehoodOfAvalanche,
    SizeAndDistribution,
    Palette,
} from 'constants/forecast/rating'
import { WHITE, BLACK } from 'constants/forecast/palette'

function RatingExplanation() {
    const ratings = Array.from(Ratings).filter(rating => rating !== NO_RATING)

    return (
        <Fragment>
            {ratings.map(rating => (
                <Section key={rating}>
                    <Header style={getStyle(rating)}>
                        {Texts.get(rating)}
                    </Header>
                    <Content>
                        <p>{TravelAdvices.get(rating)}</p>
                        <p>{LikehoodOfAvalanche.get(rating)}</p>
                        <p>{SizeAndDistribution.get(rating)}</p>
                    </Content>
                </Section>
            ))}
        </Fragment>
    )
}

export default memo.static(RatingExplanation)

// Utils
function getStyle(rating) {
    return {
        color: rating === EXTREME ? WHITE : BLACK,
        backgroundColor: Palette.get(rating),
    }
}
