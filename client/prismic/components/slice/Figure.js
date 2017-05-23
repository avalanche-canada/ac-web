import React from 'react'
import PropTypes from 'prop-types'
import { Media, Caption } from '~/components/media'
import { List, Term, Definition } from '~/components/description'
import { StructuredText } from '~/prismic/components/base'
import { parseGroup } from '~/prismic/parsers'
import InlineImage from '../base/InlineImage'

Figure.propTypes = {
    content: PropTypes.arrayOf(PropTypes.object),
}

export default function Figure(props) {
    const [{ figure, credit, caption }] = parseGroup(props)

    return (
        <Media>
            <InlineImage {...figure.main} />
            <Caption>
                <StructuredText value={caption} />
                <List>
                    <Term>Credit</Term>
                    <Definition>
                        <StructuredText value={credit} />
                    </Definition>
                </List>
            </Caption>
        </Media>
    )
}
