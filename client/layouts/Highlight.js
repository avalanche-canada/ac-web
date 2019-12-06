import React from 'react'
import { forType, OneLiner } from 'components/alert'
import { Link, StructuredText } from 'prismic/components/base'
import { highlight } from 'prismic/params'
import { useVisibility } from 'hooks/session'
import { useDocument } from 'prismic/hooks'

export default function HighlightLayout() {
    const [document] = useDocument(highlight())
    const [visible, hide] = useVisibility('highlight')

    if (!document || !visible) {
        return null
    }

    const { link, description, style } = document.data
    const Alert = forType(style)
    const content = (
        <Alert onDismiss={hide}>
            <OneLiner>
                <StructuredText value={description} />
            </OneLiner>
        </Alert>
    )

    return link ? <Link {...link}>{content}</Link> : content
}
