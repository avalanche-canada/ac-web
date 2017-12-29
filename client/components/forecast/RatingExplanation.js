import React from 'react'
import Ratings, {
    NO_RATING,
    Texts,
    TravelAdvices,
    LikehoodOfAvalanche,
    SizeAndDistribution,
} from 'constants/forecast/rating'
import StaticComponent from 'components/StaticComponent'

export default class RatingExplanation extends StaticComponent {
    render() {
        const keys = Array.from(Ratings).filter(key => key !== NO_RATING)

        return (
            <div>
                {keys.map(key => (
                    <div key={key}>
                        <h2>{Texts.get(key)}</h2>
                        <p>{TravelAdvices.get(key)}</p>
                        <p>{LikehoodOfAvalanche.get(key)}</p>
                        <p>{SizeAndDistribution.get(key)}</p>
                    </div>
                ))}
            </div>
        )
    }
}
