import React, { PropTypes } from 'react'
import * as ICONS from './constants/Icons'
import {VALUES as RATINGS} from 'constants/forecast/danger/rating'

const KEYS = Object.keys(RATINGS).filter(key => key !== 'default')
const VALUES = KEYS.map(key => RATINGS[key])

const ICONS_MAP = new Map(KEYS.map(key => [RATINGS[key], ICONS[key]]))

Icon.propTypes = {
    rating: PropTypes.oneOf(VALUES).isRequired,
}

export default function Icon({ rating = RATINGS.NOTHING }) {
    return ICONS_MAP.get(rating)
}
