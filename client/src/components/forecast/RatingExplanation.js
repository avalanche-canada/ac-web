import React from 'react'
import {neverUpdate} from '~/compose'
import Ratings, {
    NO_RATING,
    Texts,
    TravelAdvices,
    LikehoodOfAvalanche,
    SizeAndDistribution,
} from 'constants/forecast/rating'

function RatingExplanation() {
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

export default neverUpdate(RatingExplanation)
