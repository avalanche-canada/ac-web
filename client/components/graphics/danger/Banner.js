import React from 'react'
import PropTypes from 'prop-types'
import ELEVATIONS, { ALP, TLN, BTL } from 'constants/forecast/elevation'
import RATINGS, {
    NO_RATING,
    LOW,
    MODERATE,
    CONSIDERABLE,
    HIGH,
    EXTREME,
    useTexts,
    useTravelAdvices,
    useLikehoodOfAvalanche,
    useSizeAndDistribution,
} from 'constants/forecast/rating'
import { BannerFill, BannerStroke, TextFill } from './colors'
import * as Icons from './Icons'

RatingText.propTypes = {
    rating: PropTypes.oneOf(Array.from(RATINGS)).isRequired,
    showTravelAdvice: PropTypes.bool,
}

function RatingText({ rating, showTravelAdvice = false }) {
    const texts = useTexts()
    const hasTravelAdvice = showTravelAdvice && rating !== NO_RATING
    const fontSize = hasTravelAdvice ? 12 : null
    const fill = TextFill.get(rating)
    const y = hasTravelAdvice ? 14 : 23

    return (
        <text x={70} y={y} fill={fill} fontSize={fontSize}>
            {texts.get(rating)}
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

ExtraInformation.propTypes = {
    rating: PropTypes.oneOf(Array.from(RATINGS)).isRequired,
    expanded: PropTypes.bool.isRequired,
}

function ExtraInformation({ rating, expanded = false }) {
    const travelAdvices = useTravelAdvices()
    const likehoodOfAvalanche = useLikehoodOfAvalanche()
    const sizeAndDistribution = useSizeAndDistribution()

    if (rating === NO_RATING) {
        return null
    }

    const fill = TextFill.get(rating)

    return (
        <text x={70} y={24} fontSize={7} fill={fill}>
            {toLines(travelAdvices.get(rating))}
            {expanded && toLines(likehoodOfAvalanche.get(rating), 12)}
            {expanded && toLines(sizeAndDistribution.get(rating), 12)}
        </text>
    )
}

ExpandButton.propTypes = {
    rating: PropTypes.oneOf(Array.from(RATINGS)),
    x: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
}

function ExpandButton({ rating, x, onClick, expanded }) {
    if (rating === NO_RATING) {
        return null
    }

    const style = {
        cursor: 'pointer',
        zIndex: 1,
    }
    const fill = TextFill.get(rating)
    const d = expanded
        ? 'M19 13H5v-2h14v2z'
        : 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'

    return (
        <g transform={`translate(${x} 3)`} onClick={onClick} style={style}>
            <rect width={15} height={15} fill="transparent" />
            <path transform="translate(1.5 1.5) scale(0.5)" d={d} fill={fill} />
        </g>
    )
}

const ELEVATIONS_VALUES = new Map([[ALP, 0], [TLN, 1], [BTL, 2]])

Banner.propTypes = {
    elevation: PropTypes.oneOf(Array.from(ELEVATIONS)).isRequired,
    rating: PropTypes.oneOf(Array.from(RATINGS)).isRequired,
    showTravelAdvice: PropTypes.bool,
    onExpandClick: PropTypes.func,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
}

export default function Banner({
    elevation = ALP,
    rating = NO_RATING,
    showTravelAdvice = false,
    expanded,
    expandable = false,
    onExpandClick,
}) {
    const value = ELEVATIONS_VALUES.get(elevation)
    const dx = 255 + 130 + value * 20
    const dy = 205 + 6 + value * 50
    const width = 301 - value * 20
    const fill = BannerFill.get(rating)
    const stroke = BannerStroke.get(rating)
    const Icon = IconByRating.get(rating)

    return (
        <g transform={`translate(${dx} ${dy})`}>
            <rect
                x={18}
                width={width}
                height={expanded ? 90 : 37}
                fill={fill}
                stroke={stroke}
                strokeWidth={0.5}
                strokeMiterlimit={10}
            />
            <RatingText rating={rating} showTravelAdvice={showTravelAdvice} />
            {showTravelAdvice && (
                <ExtraInformation rating={rating} expanded={expanded} />
            )}
            <g transform="scale(0.45)">
                <Icon />
            </g>
            {expandable && (
                <ExpandButton
                    rating={rating}
                    onClick={onExpandClick}
                    expanded={expanded}
                    x={685 - dx}
                />
            )}
        </g>
    )
}

const IconByRating = new Map([
    [LOW, Icons.Low],
    [MODERATE, Icons.Moderate],
    [CONSIDERABLE, Icons.Considerable],
    [HIGH, Icons.High],
    [EXTREME, Icons.High],
    [NO_RATING, Icons.NoRating],
])
