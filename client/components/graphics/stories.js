import React from 'react'
import { storiesOf, action } from '@storybook/react'
import * as Ratings from 'constants/forecast/rating'
import DangerIcon from './danger/Icon';
import DangerCard from './danger/Card';

const { LOW, MODERATE, CONSIDERABLE, HIGH, EXTREME, NO_RATING } = Ratings

const story = storiesOf('Graphics', module)

Object.keys(Ratings).filter(key => key !== 'default').forEach(key => {
    story.add(`Danger Icon ${Ratings[key]}:${key}`, () => (
        <DangerIcon rating={Ratings[key]} />
    ))
})
story.add(`Danger Icon w/o rating`, () => <DangerIcon />)

story.add(`Mountain Box`, () => (
    <div>
        <DangerCard />
        <DangerCard showTravelAdvice />
        <DangerCard
            alp={LOW}
            tln={MODERATE}
            btl={HIGH}
            showTravelAdvice
            showExtraInformation
        />
        <DangerCard alp={CONSIDERABLE} tln={HIGH} btl={EXTREME} />
        <DangerCard alp={MODERATE} tln={CONSIDERABLE} btl={EXTREME} />
        <DangerCard
            alp={MODERATE}
            tln={CONSIDERABLE}
            btl={EXTREME}
            showTravelAdvice
            showExtraInformation
        />
        <DangerCard alp={EXTREME} btl={MODERATE} showTravelAdvice />
        <DangerCard
            alp={MODERATE}
            tln={CONSIDERABLE}
            btl={LOW}
            showTravelAdvice
        />
        <DangerCard
            alp={MODERATE}
            tln={CONSIDERABLE}
            btl={CONSIDERABLE}
            showTravelAdvice
            showExtraInformation
        />
    </div>
))
