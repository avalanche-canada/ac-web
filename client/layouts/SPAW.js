import React from 'react'
import PropTypes from 'prop-types'
import Highlight from 'components/highlight'
import { Danger, OneLiner } from 'components/alert'
import { Link, StructuredText } from 'prismic/components/base'
import { spaw } from 'prismic/params'
import { useSessionStorage } from 'hooks'
import { useDocument } from 'prismic/hooks'

export default function SPAW() {
    const [document] = useSPAW()
    const [hidden, setHidden] = useSessionStorage(
        'spaw-hidden',
        false,
        Boolean,
        String
    )
    function handleDismiss() {
        setHidden(true)
    }

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
}

Region.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

export function Region({ name, children }) {
    const [document] = useSPAW()

    return document?.data?.[name] === 'Yes' ? children({ document }) : null
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
function useSPAW() {
    return useDocument(spaw())
}
