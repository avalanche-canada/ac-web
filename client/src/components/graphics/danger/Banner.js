import React, {PropTypes} from 'react'
import * as RATINGS from 'constants/forecast/danger/rating'
import * as ELEVATIONS from 'constants/forecast/elevation'
import * as BANNER_FILL from './colors/BannerFill'
import * as BANNER_STROKE from './colors/BannerStroke'
import * as TEXT_FILL from './colors/TextFill'
import * as GROUPS from './constants/IconGroups'
import {asMap, asValues} from 'constants/utils'

function K() {}

const {ALP, TLN, BTL} = ELEVATIONS.VALUES

// Texts
const RATING_TEXT_MAP = asMap(RATINGS.VALUES, RATINGS.TEXTS)
const TRAVEL_ADVICE_TEXT_MAP = asMap(RATINGS.VALUES, RATINGS.ADVICES)
const LIKEHOOD_OF_AVALANCHES_TEXT_MAP = asMap(RATINGS.VALUES, RATINGS.LIKEHOOD)
const AVALANCHE_SIZE_AND_DISTRIBUTION_TEXT_MAP = asMap(RATINGS.VALUES, RATINGS.SIZE_AND_DISTRIBUTION)

// Colors
const BANNER_FILL_COLORS = asMap(RATINGS.VALUES, BANNER_FILL)
const BANNER_STROKE_COLORS = asMap(RATINGS.VALUES, BANNER_STROKE)
const TEXT_FILL_COLORS = asMap(RATINGS.VALUES, TEXT_FILL)

const GROUPS_MAP = asMap(RATINGS.VALUES, GROUPS)

const {NO_RATING, CONSIDERABLE} = RATINGS.VALUES

function RatingText({ rating, showTravelAdvice }) {
    const hasTravelAdvice = showTravelAdvice && rating !== NO_RATING
    const fontSize = hasTravelAdvice ? 12 : null
    const fill = TEXT_FILL_COLORS.get(rating)
    const y = hasTravelAdvice ? 14 : 23

    return (
        <text x={70} y={y} fill={fill} fontSize={fontSize}>
            {RATING_TEXT_MAP.get(rating)}
        </text>
    )
}
function toLines(text, first = 0) {
    return text.split('\n ').map((line, index) => (
        <tspan x={70} dy={index === 0 ? first : 9}>
            {line}
        </tspan>
    ))
}
function ExtraInformation({ rating, expanded }) {
    if (rating === NO_RATING) {
        return null
    }

    const fill = TEXT_FILL_COLORS.get(rating)

    return (
        <text x={70} y={24} fontSize={7} fill={fill} >
            {toLines(TRAVEL_ADVICE_TEXT_MAP.get(rating))}
            {expanded && toLines(LIKEHOOD_OF_AVALANCHES_TEXT_MAP.get(rating), 12)}
            {expanded && toLines(AVALANCHE_SIZE_AND_DISTRIBUTION_TEXT_MAP.get(rating), 12)}
        </text>
    )
}

function ExpandButton({ rating, x, onClick, expanded }) {
    if (rating === NO_RATING) {
        return null
    }

    const style = { cursor: 'pointer', zIndex: 1 }
    const fill = TEXT_FILL_COLORS.get(rating)
    const d = expanded ? 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' : 'M19 13H5v-2h14v2z'

    return (
        <g transform={`translate(${x} 3)`} onClick={onClick} style={style} >
            <rect width={15} height={15} fill='transparent' />
            <path transform="translate(1.5 1.5) scale(0.5)" d={d} fill={fill} />
        </g>
    )
}

Banner.propTypes = {
    elevation: PropTypes.oneOf(asValues(ELEVATIONS.VALUES)).isRequired,
    rating: PropTypes.oneOf(asValues(RATINGS.VALUES)).isRequired,
    showTravelAdvice: PropTypes.bool,
    onExpandClick: PropTypes.func,
    expandable: PropTypes.bool,
}

const ELEVATIONS_VALUES = new Map([
    [ALP, 0],
    [TLN, 1],
    [BTL, 2],
])

export default function Banner({
    elevation = ALP,
    rating = NO_RATING,
    showTravelAdvice = false,
    expanded,
    expandable = false,
    onExpandClick = K,
}) {
    const value = ELEVATIONS_VALUES.get(elevation)
    const dx = 255 + 130 + value * 20
    const dy = 205 + 6 + value * 50
    const width = 301 - value * 20

    return (
        <g transform={`translate(${dx} ${dy})`} >
            <rect x={18} width={width} height={expanded ? 90 : 37} fill={BANNER_FILL_COLORS.get(rating)} stroke={BANNER_STROKE_COLORS.get(rating)} strokeWidth={0.5} strokeMiterlimit={10} />
            <RatingText rating={rating} showTravelAdvice={showTravelAdvice} />
            {showTravelAdvice && <ExtraInformation rating={rating} expanded={expanded} />}
            <g transform="scale(0.45)">
                {GROUPS_MAP.get(rating)}
            </g>
            {expandable &&
                <ExpandButton rating={rating} onClick={onExpandClick} expanded={expanded} x={685 - dx} />
            }
        </g>
    )
}
