import React from 'react'
import PropTypes from 'prop-types'
import Link from 'prismic/components/Link'
import styles from './SPAW.css'

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
    if (!link) {
        return (
            <span className={styles.SPAW} style={style}>
                {children}
            </span>
        )
    }

    return (
        <Link className={styles.SPAW} document={link} style={style}>
            {children}
        </Link>
    )
}
