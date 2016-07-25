import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import * as RATINGS from 'constants/forecast/danger/rating/values'
import {DangerIcon, DangerCard} from './index'

const {LOW, MODERATE, CONSIDERABLE, HIGH, EXTREME, NO_RATING} = RATINGS

const story = storiesOf('Graphics', module)

Object.keys(RATINGS).filter(key => key !== 'default').forEach(key => {
    story.add(`Danger Icon ${RATINGS[key]}:${key}`, () => <DangerIcon rating={RATINGS[key]} />)
})
story.add(`Danger Icon w/o rating`, () => <DangerIcon />)

story.add(`Mountain Box`, () => (
    <div>
        <DangerCard />
        <DangerCard showTravelAdvice />
        <DangerCard alp={LOW} tln={MODERATE} btl={HIGH} showTravelAdvice showExtraInformation />
        <DangerCard alp={CONSIDERABLE} tln={HIGH} btl={EXTREME} />
        <DangerCard alp={MODERATE} tln={CONSIDERABLE} btl={EXTREME} />
        <DangerCard alp={MODERATE} tln={CONSIDERABLE} btl={EXTREME} showTravelAdvice showExtraInformation />
        <DangerCard alp={EXTREME} btl={MODERATE} showTravelAdvice />
        <DangerCard alp={MODERATE} tln={CONSIDERABLE} btl={LOW} showTravelAdvice />
        <DangerCard alp={MODERATE} tln={CONSIDERABLE} btl={CONSIDERABLE} showTravelAdvice showExtraInformation />
    </div>
))
