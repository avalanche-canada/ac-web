import React from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import Highlight from 'components/highlight'
import { Danger } from 'components/alert'
import { Link, StructuredText } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { spaw } from 'prismic/params'
import { isTouchable } from 'utils/device'
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
                        <Danger onDismiss={handleDismiss}>
                            <Link {...link}>
                                <StructuredText value={description} />
                                <span>
                                    {isTouchable ? 'Tap' : 'Click'} for more
                                    information
                                </span>
                            </Link>
                        </Danger>
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
