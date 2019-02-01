import React, { Children, cloneElement, useState } from 'react'
import PropTypes from 'prop-types'
import HeaderSet from './HeaderSet'
import PanelSet from './PanelSet'
import styles from './Tabs.css'

Tabs.propTypes = {
    children: PropTypes.element.isRequired,
    theme: PropTypes.oneOf(['LOOSE', 'COMPACT']),
    activeTab: PropTypes.number,
    onTabChange: PropTypes.func,
}

Tabs.defaultProps = {
    theme: 'COMPACT',
    onTabChange() {},
}

export default function Tabs({ onTabChange, children, theme, ...props }) {
    const [activeTab, setActiveTab] = useState(props.activeTab || 0)

    return (
        <div className={styles.Tabs}>
            {Children.map(children, child => {
                switch (child.type) {
                    case HeaderSet:
                        return cloneElement(child, {
                            activeTab,
                            onTabChange(activeTab) {
                                setActiveTab(activeTab)
                                onTabChange(activeTab)
                            },
                            theme: child.props.theme || theme,
                        })
                    case PanelSet:
                        return cloneElement(child, {
                            activeTab,
                        })
                    default:
                        throw new Error(
                            'Wrong child provided to Tabs components'
                        )
                }
            })}
        </div>
    )
}
