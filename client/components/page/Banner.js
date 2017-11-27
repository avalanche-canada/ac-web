import React from 'react'
import PropTypes from 'prop-types'
import { Credit } from 'components/markup'
import Dimensions from 'components/Dimensions'
import styles from './Page.css'

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
                <Dimensions>
                    {({ width }) => (
                        <Credit compact={width < 400}>{copyright}</Credit>
                    )}
                </Dimensions>
            )}
            {children}
        </div>
    )
}
