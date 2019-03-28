import React, { memo } from 'react'
import PropTypes from 'prop-types'
import camelCase from 'lodash/camelCase'
import Highlight, { DANGER } from 'components/highlight'
import { Link } from 'prismic/components/base'
import { Document } from 'prismic/containers'
import { spaw } from 'prismic/params'
import { Banner } from 'components/application'
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
                    <Banner>
                        <Highlight
                            type={DANGER}
                            onDismiss={handleDismiss}
                            dismissable>
                            <Link {...link}>
                                <p>
                                    {description[0].text}{' '}
                                    {isTouchable ? 'Tap' : 'Click'} for more
                                    information
                                </p>
                            </Link>
                        </Highlight>
                    </Banner>
                )
            }}
        </Document>
    )
}

BaseRegion.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
}

function BaseRegion({ name, children }) {
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

export const Region = memo(BaseRegion)
