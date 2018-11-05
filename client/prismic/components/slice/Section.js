import React, { memo } from 'react'
import { Section as Base } from 'components/page'
import { StructuredText, Link } from 'prismic/components/base'

function Section({ value }) {
    const [{ content, title, link, ...props }] = value

    return (
        <Base title={link ? <Link {...link}>{title}</Link> : title} {...props}>
            <StructuredText value={content} />
        </Base>
    )
}

export default memo(Section)
