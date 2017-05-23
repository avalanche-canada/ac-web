import React from 'react'
import PropTypes from 'prop-types'
import { Blockquote, Footer } from '~/components/blockquote'
import { parseGroup } from '~/prismic/parsers'
import { StructuredText } from '~/prismic/components/base'

Quote.propTypes = {
    content: PropTypes.string.isRequired,
    footer: PropTypes.string,
}

export default function Quote(props) {
    const [{ content, footer }] = parseGroup(props)

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
