import React from 'react'
import PropTypes from 'prop-types'
import { Blockquote, Footer } from '~/components/blockquote'
import { StructuredText } from '~/prismic/components/base'

Quote.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string.isRequired,
            footer: PropTypes.string,
        })
    ).isRequired,
}

export default function Quote({ value }) {
    const [{ content, footer }] = value

    return (
        <Blockquote>
            <StructuredText value={content} />
            {footer &&
                <Footer>
                    <StructuredText value={footer} />
                </Footer>}
        </Blockquote>
    )
}
