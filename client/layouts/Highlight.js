import React from 'react'
import Component from 'components/highlight'
import { Banner } from 'components/application'
import { Link, StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { highlight } from 'prismic/params'
import { useSessionStorage } from 'utils/react/hooks'

export default function Highlight() {
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
                const content = <StructuredText value={description} />

                return (
                    <Banner>
                        <Component
                            type={style}
                            onDismiss={handleDismiss}
                            dismissable>
                            {link ? <Link {...link}>{content}</Link> : content}
                        </Component>
                    </Banner>
                )
            }}
        </Document>
    )
}
