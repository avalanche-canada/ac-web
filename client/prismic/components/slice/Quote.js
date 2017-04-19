import React from 'react'
import PropTypes from 'prop-types'
import {Blockquote, Footer} from '~/components/blockquote'

Quote.propTypes = {
    content: PropTypes.string.isRequired,
    footer: PropTypes.string,
}

export default function Quote({content, footer}) {
    return (
        <Blockquote>
            {content}
            {footer && <Footer>{footer}</Footer>}
        </Blockquote>
    )
}
