import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import format from 'date-fns/format'

// FIXME For i18n: we should use <FormattedRelativeTime> instead. We will not to translate date-fns

Relative.propTypes = {
    value: PropTypes.oneOfType(PropTypes.instanceOf(Date), PropTypes.string),
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
        <time dateTime={format(value)}>
            {children || distanceInWordsToNow(value, options)}
        </time>
    )
}
