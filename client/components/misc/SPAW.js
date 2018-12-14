import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'prismic/components/base'
import styles from './SPAW.css'

// TODO Should use <Alert>

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
        <span className={styles.SPAW} style={style}>
            {children}
        </span>
    )

    return link ? <Link {...link}>{content}</Link> : content
}
