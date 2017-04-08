import React from 'react'
import PropTypes from 'prop-types'
import Ratings, {NO_RATING} from 'constants/forecast/rating'
import Icons from './Icons'

Icon.propTypes = {
    rating: PropTypes.oneOf(Array.from(Ratings)).isRequired,
}

export default function Icon({rating = NO_RATING}) {
    return Icons.get(rating)
}
