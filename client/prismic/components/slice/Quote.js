import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/misc'
import { Blockquote, Footer } from '~/components/blockquote'
import { StructuredText } from '~/prismic/components/base'

Quote.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.array.isRequired,
            author: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date),
        })
    ).isRequired,
}

export default function Quote({ value }) {
    const [{ content, author, date }] = value

    return (
        <Blockquote>
            <StructuredText value={content} />
            {author &&
                <Footer>
                    {author}
                    {date && ' '}
                    {date && <DateElement value={date} />}
                </Footer>}
        </Blockquote>
    )
}
