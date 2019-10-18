import React from 'react'
import Highlight from 'components/highlight'
import { forType, OneLiner } from 'components/alert'
import { Link, StructuredText } from 'prismic/components/base'
import { highlight } from 'prismic/params'
import { useSessionStorage } from 'hooks'
import { useDocument } from 'prismic/hooks'

export default function HighlightLayout() {
    const [document] = useDocument(highlight())
    const [hidden, setHidden] = useSessionStorage('highlight-hidden', false)
    function handleDismiss() {
        setHidden(true)
    }

    if (!document || hidden) {
        return null
    }

    const { link, description, style } = document.data
    const Alert = forType(style)
    const content = (
        <Alert onDismiss={handleDismiss}>
            <OneLiner>
                <StructuredText value={description} />
            </OneLiner>
        </Alert>
    )

    return (
        <Highlight>
            {link ? <Link {...link}>{content}</Link> : content}
        </Highlight>
    )
}
