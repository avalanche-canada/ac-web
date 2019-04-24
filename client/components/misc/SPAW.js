import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'prismic/components/base'
import { SPAW as Component, OneLiner } from 'components/alert'

SPAW.propTypes = {
    href: PropTypes.object,
    link: PropTypes.object,
    style: PropTypes.object,
    children: PropTypes.node,
}

export default function SPAW({
    children = 'Special Public Avalanche Warning',
    link,
    style,
}) {
    const content = (
        <Component style={style}>
            <OneLiner>{children}</OneLiner>
        </Component>
    )

    return link ? <Link {...link}>{content}</Link> : content
}
