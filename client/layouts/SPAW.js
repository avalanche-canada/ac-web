import React from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import Highlight from 'components/highlight'
import { Danger, OneLiner } from 'components/alert'
import { Link, StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { spaw } from 'prismic/params'
import { useSessionStorage } from 'utils/react/hooks'

export default function SPAW() {
    const [hidden, setHidden] = useSessionStorage(
        'spaw-hidden',
        false,
        Boolean,
        String
    )
    function handleDismiss() {
        setHidden(true)
    }

    return (
        <Document {...spaw()}>
            {({ document }) => {
                if (!document || hidden) {
                    return null
                }

                const { link, description } = document.data

                return (
                    <Highlight>
                        <Link {...link}>
                            <Alert onDismiss={handleDismiss}>
                                <StructuredText value={description} />
                            </Alert>
                        </Link>
                    </Highlight>
                )
            }}
        </Document>
    )
}

Region.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Region({ name, children }) {
    return (
        <Document {...spaw()}>
            {({ document }) =>
                document && document.data[camelCase(name)] === 'Yes'
                    ? children({ document })
                    : null
            }
        </Document>
    )
}

Alert.propTypes = {
    link: PropTypes.object,
    children: PropTypes.node,
}

export function Alert({
    children = 'Special Public Avalanche Warning',
    link,
    ...rest
}) {
    const content = (
        <Danger {...rest}>
            <OneLiner>{children}</OneLiner>
        </Danger>
    )

    return link ? <Link {...link}>{content}</Link> : content
}
