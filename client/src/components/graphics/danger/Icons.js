import React from 'react'
import PropTypes from 'prop-types'
import * as Ratings from '~/constants/forecast/rating'
import Groups from './IconGroups'

Svg.propTypes = {
    children: PropTypes.shape({
        props: PropTypes.shape({
            children: PropTypes.node.isRequired
        }).isRequired
    }).isRequired,
}

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
            {Groups.get(Ratings.LOW)}
        </Svg>
    )],
    [Ratings.MODERATE, (
        <Svg width={81.62} height={81.61}>
            {Groups.get(Ratings.MODERATE)}
        </Svg>
    )],
    [Ratings.CONSIDERABLE, (
        <Svg width={98.38} height={81.61}>
            {Groups.get(Ratings.CONSIDERABLE)}
        </Svg>
    )],
    [Ratings.HIGH, (
        <Svg width={113.31} height={81.62}>
            {Groups.get(Ratings.HIGH)}
        </Svg>
    )],
    [Ratings.EXTREME, (
        <Svg width={113.31} height={81.62}>
            {Groups.get(Ratings.EXTREME)}
        </Svg>
    )],
    [Ratings.NO_RATING, (
        <Svg width={82.46} height={82.47}>
            {Groups.get(Ratings.NO_RATING)}
        </Svg>
    )],
])
