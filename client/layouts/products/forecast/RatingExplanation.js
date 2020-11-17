import React from 'react'
import { Section, Header, Content } from 'components/explanation'
import Ratings, {
    NO_RATING,
    useTexts,
    useTravelAdvices,
    useLikehoodOfAvalanche,
    useSizeAndDistribution,
} from 'constants/forecast/rating'
import RatingStyles from 'styles/forecasts/ratings.css'

export default function RatingExplanation() {
    const texts = useTexts()
    const travelAdvices = useTravelAdvices()
    const likehoodOfAvalanche = useLikehoodOfAvalanche()
    const sizeAndDistribution = useSizeAndDistribution()
    const ratings = Array.from(Ratings).filter(rating => rating !== NO_RATING)

    return ratings.map(rating => (
        <Section key={rating}>
            <Header style={RatingStyles[rating]}>{texts.get(rating)}</Header>
            <Content>
                <p>{travelAdvices.get(rating)}</p>
                <p>{likehoodOfAvalanche.get(rating)}</p>
                <p>{sizeAndDistribution.get(rating)}</p>
            </Content>
        </Section>
    ))
}
