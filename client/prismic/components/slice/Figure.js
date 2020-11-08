import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Media, Caption } from 'components/media'
import { List, Term, Definition } from 'components/description'
import { StructuredText } from 'prismic/components/base'
import Image from '../base/Image'

Figure.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object),
}

export default function Figure({ value }) {
    const [{ figure, credit, caption }] = value
    const hasCaptionContent = hasContent(caption) || hasContent(credit)

    return (
        <Media>
            <Image {...figure} />
            {hasCaptionContent && (
                <Caption>
                    {hasContent(caption) && <StructuredText value={caption} />}
                    {hasContent(credit) && (
                        <List>
                            <Term>
                                <FormattedMessage
                                    description="credit"
                                    defaultMessage="Credit"
                                />
                            </Term>
                            <Definition>
                                <StructuredText value={credit} />
                            </Definition>
                        </List>
                    )}
                </Caption>
            )}
        </Media>
    )
}

function hasContent(content = []) {
    if (!Array.isArray(content)) {
        return false
    }

    const concat = (string, { text }) => string + text

    return content.filter(Boolean).reduce(concat, '').length > 0
}
