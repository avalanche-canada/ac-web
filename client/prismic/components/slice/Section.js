import React from 'react'
import { Section as Base } from 'components/page'
import { StructuredText, Link } from 'prismic/components/base'

export default function Section({ value }) {
    const [{ content, title, link, ...props }] = value

    return (
        <Base title={link ? <Link {...link}>{title}</Link> : title} {...props}>
            <StructuredText value={content} />
        </Base>
    )
}
