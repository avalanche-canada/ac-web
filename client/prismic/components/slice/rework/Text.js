import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { StructuredText } from 'prismic/components/base'

Text.propTypes = {
    nonRepeat: PropTypes.shape({
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
}

function Text({ nonRepeat }) {
    return <StructuredText value={nonRepeat.content} />
}

export default memo(Text)
