import React, {PropTypes} from 'react'
import Elevations, {ALP, TLN, BTL} from 'constants/forecast/elevation'
import Ratings, {
    NO_RATING,
    CONSIDERABLE,
    Texts as RatingTexts,
    TravelAdvices,
    LikehoodOfAvalanche,
    SizeAndDistribution,
} from 'constants/forecast/rating'
import {BannerFill, BannerStroke, TextFill} from './colors'
import IconGroups from './IconGroups'

function noop() {}

function RatingText({ rating, showTravelAdvice }) {
    const hasTravelAdvice = showTravelAdvice && rating !== NO_RATING
    const fontSize = hasTravelAdvice ? 12 : null
    const fill = TextFill.get(rating)
    const y = hasTravelAdvice ? 14 : 23

    return (
        <text x={70} y={y} fill={fill} fontSize={fontSize}>
            {RatingTexts.get(rating)}
        </text>
    )
}
function toLines(text, first = 0) {
    return text.split('\n ').map((line, index) => (
        <tspan key={index} x={70} dy={index === 0 ? first : 9}>
            {line}
        </tspan>
    ))
}
function ExtraInformation({rating, expanded}) {
    if (rating === NO_RATING) {
        return null
    }

    const fill = TextFill.get(rating)

    return (
        <text x={70} y={24} fontSize={7} fill={fill} >
            {toLines(TravelAdvices.get(rating))}
            {expanded && toLines(LikehoodOfAvalanche.get(rating), 12)}
            {expanded && toLines(SizeAndDistribution.get(rating), 12)}
        </text>
    )
}

function ExpandButton({ rating, x, onClick, expanded }) {
    if (rating === NO_RATING) {
        return null
    }

    const style = {
        cursor: 'pointer',
        zIndex: 1
    }
    const fill = TextFill.get(rating)
    const d = expanded ? 'M19 13H5v-2h14v2z' : 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'

    return (
        <g transform={`translate(${x} 3)`} onClick={onClick} style={style} >
            <rect width={15} height={15} fill='transparent' />
            <path transform='translate(1.5 1.5) scale(0.5)' d={d} fill={fill} />
        </g>
    )
}

const ELEVATIONS_VALUES = new Map([
    [ALP, 0],
    [TLN, 1],
    [BTL, 2],
])

Banner.propTypes = {
    elevation: PropTypes.oneOf(Array.from(Elevations)).isRequired,
    rating: PropTypes.oneOf(Array.from(Ratings)).isRequired,
    showTravelAdvice: PropTypes.bool,
    onExpandClick: PropTypes.func,
    expandable: PropTypes.bool,
}

export default function Banner({
    elevation = ALP,
    rating = NO_RATING,
    showTravelAdvice = false,
    expanded,
    expandable = false,
    onExpandClick = noop,
}) {
    const value = ELEVATIONS_VALUES.get(elevation)
    const dx = 255 + 130 + value * 20
    const dy = 205 + 6 + value * 50
    const width = 301 - value * 20
    const fill = BannerFill.get(rating)
    const stroke = BannerStroke.get(rating)

    return (
        <g transform={`translate(${dx} ${dy})`} >
            <rect x={18} width={width} height={expanded ? 90 : 37} fill={fill} stroke={stroke} strokeWidth={0.5} strokeMiterlimit={10} />
            <RatingText rating={rating} showTravelAdvice={showTravelAdvice} />
            {showTravelAdvice && <ExtraInformation rating={rating} expanded={expanded} />}
            <g transform='scale(0.45)'>
                {IconGroups.get(rating)}
            </g>
            {expandable &&
                <ExpandButton rating={rating} onClick={onExpandClick} expanded={expanded} x={685 - dx} />
            }
        </g>
    )
}
