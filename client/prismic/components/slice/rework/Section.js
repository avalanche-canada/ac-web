import React from 'react'
import PropTypes from 'prop-types'
import { Section as Base } from 'components/page'
import { StructuredText } from 'prismic/components/base'

Section.propTypes = {
    primary: PropTypes.shape({
        header: PropTypes.object,
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
}

export default function Section({ primary }) {
    const { content, header } = primary

    return (
        <Base title={<StructuredText value={header} />}>
            <StructuredText value={content} />
        </Base>
    )
}
