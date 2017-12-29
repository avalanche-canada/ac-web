import React from 'react'
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
    getStyle(rating) {
        return {
            padding: '0.5em',
            color: rating === EXTREME ? WHITE : BLACK,
            backgroundColor: Palette.get(rating),
        }
    }
    render() {
        const ratings = Array.from(Ratings).filter(
            rating => rating !== NO_RATING
        )

        return (
            <div>
                {ratings.map(rating => (
                    <div key={rating}>
                        <h2 style={this.getStyle(rating)}>
                            {Texts.get(rating)}
                        </h2>
                        <p>{TravelAdvices.get(rating)}</p>
                        <p>{LikehoodOfAvalanche.get(rating)}</p>
                        <p>{SizeAndDistribution.get(rating)}</p>
                    </div>
                ))}
            </div>
        )
    }
}
