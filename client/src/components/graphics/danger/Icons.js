import React from 'react'
import * as Ratings from '/constants/forecast/rating'
import * as Groups from './IconGroups'

function Svg({children, ...props}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' {...props}>
            {children.props.children}
        </svg>
    )
}

export default new Map([
    [Ratings.LOW, (
        <Svg width={81.62} height={81.62}>
            {Groups.LOW}
        </Svg>
    )],
    [Ratings.MODERATE, (
        <Svg width={81.62} height={81.61}>
            {Groups.MODERATE}
        </Svg>
    )],
    [Ratings.CONSIDERABLE, (
        <Svg width={98.38} height={81.61}>
            {Groups.CONSIDERABLE}
        </Svg>
    )],
    [Ratings.HIGH, (
        <Svg width={113.31} height={81.62}>
            {Groups.HIGH}
        </Svg>
    )],
    [Ratings.EXTREME, (
        <Svg width={113.31} height={81.62}>
            {Groups.EXTREME}
        </Svg>
    )],
    [Ratings.NO_RATING, (
        <Svg width={82.46} height={82.47}>
            {Groups.NO_RATING}
        </Svg>
    )],
])
