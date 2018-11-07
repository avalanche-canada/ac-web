import React, { memo, Children, cloneElement } from 'react'
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

const EAGER_STYLES = new Map([
    [true, { display: 'inherit' }],
    [false, { display: 'none' }],
])

// TODO: Remove once MIN form moved to Formik

EagerPanelSet.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    activeTab: PropTypes.number,
}

function EagerPanelSet({ activeTab, children }) {
    return Children.map(children, (panel, index) =>
        cloneElement(panel, {
            style: EAGER_STYLES.get(index === activeTab),
        })
    )
}

export const EagerPanelSet = memo(EagerPanelSet)

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
