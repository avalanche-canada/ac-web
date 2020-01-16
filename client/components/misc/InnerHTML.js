import React, { memo } from 'react'
import PropTypes from 'prop-types'

InnerHTML.propTypes = {
    children: PropTypes.string,
}

function InnerHTML({ children, ...props }) {
    if (!children) {
        return null
    }

    return <div {...props} dangerouslySetInnerHTML={{ __html: children }} />
}

export default memo(InnerHTML)
