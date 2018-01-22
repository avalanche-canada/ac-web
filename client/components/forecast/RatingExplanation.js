import React, { Component, Fragment } from 'react'
import { Compound as Section } from 'components/explanation'
import Ratings, {
    NO_RATING,
    Texts,
    TravelAdvices,
    LikehoodOfAvalanche,
    SizeAndDistribution,
} from 'constants/forecast/rating'

export default class RatingExplanation extends Component {
    shouldComponentUpdate() {
        return false
    }
    render() {
        const keys = Array.from(Ratings).filter(key => key !== NO_RATING)

        return (
            <Fragment>
                {keys.map(key => (
                    <Section key={key} header={Texts.get(key)}>
                        <p>{TravelAdvices.get(key)}</p>
                        <p>{LikehoodOfAvalanche.get(key)}</p>
                        <p>{SizeAndDistribution.get(key)}</p>
                    </Section>
                ))}
            </Fragment>
        )
    }
}
