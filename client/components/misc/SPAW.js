import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'prismic/components/base'
import { SPAW as Component } from 'components/alert'

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
    const content = <Component style={style}>{children}</Component>

    return link ? <Link {...link}>{content}</Link> : content
}
