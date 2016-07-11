import React, {PropTypes} from 'react'
import {InnerHTML} from 'components/misc'

Block.propTypes = {
    content: PropTypes.string.isRequired,
}

export default function Block({content}) {
    return (
        <InnerHTML>
            {content}
        </InnerHTML>
    )
}
