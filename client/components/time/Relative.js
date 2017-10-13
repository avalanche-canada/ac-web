import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

Relative.propTypes = {
    value: PropTypes.instanceOf(Date),
    options: PropTypes.object,
    children: PropTypes.node,
}

export default function Relative({
    value = new Date(),
    children,
    options = {
        addSuffix: true,
    },
}) {
    return (
        <time dateTime={value.toISOString()}>
            {children || distanceInWordsToNow(value, options)}
        </time>
    )
}
