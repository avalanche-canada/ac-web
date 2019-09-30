import React from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'

Text.propTypes = {
    primary: PropTypes.shape({
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
}

export default function Text({ primary }) {
    return <StructuredText value={primary.content} />
}
