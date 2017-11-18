import React from 'react'
import PropTypes from 'prop-types'
import { Credit } from 'components/markup'
import { ElementResize } from 'components/misc'
import styles from './Page.css'

const STYLE = {
    height: '100%',
}

Banner.propTypes = {
    url: PropTypes.string.isRequired,
    copyright: PropTypes.string,
    children: PropTypes.node,
}

export default function Banner({ url, copyright, children }) {
    const style = {
        backgroundImage: `url("${url}")`,
    }

    return (
        <div className={styles.Banner} style={style}>
            {copyright && (
                <ElementResize style={STYLE}>
                    {width => (
                        <Credit compact={width < 400}>{copyright}</Credit>
                    )}
                </ElementResize>
            )}
            {children}
        </div>
    )
}
