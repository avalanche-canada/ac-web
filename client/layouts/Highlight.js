import React from 'react'
import Highlight from 'components/highlight'
import { forType, OneLiner } from 'components/alert'
import { Link, StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { highlight } from 'prismic/params'
import { useSessionStorage } from 'hooks'

export default function HighlightLayout() {
    const [hidden, setHidden] = useSessionStorage(
        'highlight-hidden',
        false,
        Boolean,
        String
    )
    function handleDismiss() {
        setHidden(true)
    }

    return (
        <Document {...highlight()}>
            {({ document }) => {
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
            }}
        </Document>
    )
}
