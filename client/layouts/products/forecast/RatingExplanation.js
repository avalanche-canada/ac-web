import React, { Fragment } from 'react'
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
import StaticComponent from 'components/StaticComponent'

export default class RatingExplanation extends StaticComponent {
    render() {
        const ratings = Array.from(Ratings).filter(
            rating => rating !== NO_RATING
        )

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
}

// Utils
function getStyle(rating) {
    return {
        color: rating === EXTREME ? WHITE : BLACK,
        backgroundColor: Palette.get(rating),
    }
}
