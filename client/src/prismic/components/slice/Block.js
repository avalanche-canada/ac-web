import React from 'react'
import PropTypes from 'prop-types'
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
