import React, { memo, Children } from 'react'
import PropTypes from 'prop-types'
import styles from './Tabs.css'

PanelSet.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
    activeTab: PropTypes.number,
}

function PanelSet({ activeTab, children }) {
    children = Array.isArray(children) ? children : Children.toArray(children)

    return children[activeTab] || null
}

export default memo(PanelSet)

Panel.propTypes = {
    style: PropTypes.object,
    children: PropTypes.number,
}

export function Panel({ children, style }) {
    return (
        <div role="tabpanel" className={styles.Panel} style={style}>
            {children}
        </div>
    )
}
