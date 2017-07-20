import React from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from '~/components/media'
import { List, Term, Definition } from '~/components/description'
import { StructuredText } from '~/prismic/components/base'
import Image from '../base/Image'

Figure.propTypes = {
    value: PropTypes.arrayOf(PropTypes.object),
}

export default function Figure({ value }) {
    const [{ figure, credit, caption }] = value
    const hasCaptionContent = caption || credit

    return (
        <Media>
            <Image {...figure.main} />
            {hasCaptionContent &&
                <Caption>
                    {caption && <StructuredText value={caption} />}
                    {credit &&
                        <List>
                            <Term>Credit</Term>
                            <Definition>
                                <StructuredText value={credit} />
                            </Definition>
                        </List>}
                </Caption>}
        </Media>
    )
}
