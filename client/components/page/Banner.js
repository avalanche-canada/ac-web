import React from 'react'
import PropTypes from 'prop-types'
import { Credit } from 'components/markup'
import styles from './Page.css'
import { useWindowSize } from 'utils/react/hooks'

Banner.propTypes = {
    url: PropTypes.string.isRequired,
    copyright: PropTypes.string,
    children: PropTypes.node,
}

export default function Banner({ url, copyright, children }) {
    const { width } = useWindowSize()
    const style = {
        backgroundImage: `url("${url}")`,
    }

    return (
        <div className={styles.Banner} style={style}>
            {copyright && <Credit compact={width < 400}>{copyright}</Credit>}
            {children}
        </div>
    )
}
