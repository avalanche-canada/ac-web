import React, { cloneElement, Children, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import noop from 'lodash/noop'
import { Expand } from 'components/button'
import { useToggle } from 'hooks'
import { WHITE } from 'constants/colors'
import css from './Tabs.css'

const COMPACT = 'COMPACT'
const LOOSE = 'LOOSE'

Tabs.propTypes = {
    children: PropTypes.element.isRequired,
    theme: PropTypes.oneOf([LOOSE, COMPACT]),
    activeTab: PropTypes.number,
    onTabChange: PropTypes.func,
}

export default function Tabs({
    onTabChange = noop,
    children,
    theme = COMPACT,
    ...props
}) {
    const [activeTab, setActiveTab] = useState(props.activeTab || 0)

    return (
        <div className={css.Tabs}>
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
                        return null
                }
            })}
        </div>
    )
}

PanelSet.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
    ]).isRequired,
    activeTab: PropTypes.number,
}

export function PanelSet({ activeTab, children }) {
    children = Array.isArray(children) ? children : Children.toArray(children)

    return children[activeTab] || null
}

Panel.propTypes = {
    style: PropTypes.object,
    children: PropTypes.number,
}

export function Panel({ children, style }) {
    return (
        <div role="tabpanel" className={css.Panel} style={style}>
            {children}
        </div>
    )
}

HeaderSet.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    activeTab: PropTypes.number,
    onTabChange: PropTypes.func,
    theme: PropTypes.oneOf([LOOSE, COMPACT]),
    stacked: PropTypes.bool,
}

export function HeaderSet({
    theme = COMPACT,
    stacked,
    children,
    onTabChange,
    activeTab,
}) {
    const [expanded, toggleExpanded] = useToggle(false)
    const className = classnames({
        [css.HeaderSet]: true,
        [css['HeaderSet--Loose']]: theme === LOOSE,
        [css['HeaderSet--Compact']]: theme === COMPACT,
        [css['HeaderSet--Stacked']]: stacked,
        [css['HeaderSet--Expanded']]: expanded,
    })

    return (
        <div
            className={className}
            onClick={stacked ? toggleExpanded : undefined}>
            {Children.toArray(children)
                .filter(Boolean)
                .map((header, index) =>
                    cloneElement(header, {
                        isActive: index === activeTab,
                        onActivate() {
                            if (header.props.disabled) {
                                return
                            }

                            onTabChange(index)
                        },
                    })
                )}
            {stacked && <Expand chevron expanded={expanded} color={WHITE} />}
        </div>
    )
}

Header.propTypes = {
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    arrow: PropTypes.bool,
    onActivate: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

export function Header({
    isActive,
    disabled,
    arrow,
    onActivate,
    children,
    style,
}) {
    const className = classnames({
        [css.Header]: true,
        [css['Header--Arrow']]: arrow,
        [css['Header--isActive']]: isActive,
        [css['Header--Disabled']]: disabled,
    })

    return (
        <div
            role="tab"
            className={className}
            style={style}
            onClick={onActivate}>
            {children}
        </div>
    )
}

ColoredHeader.propTypes = {
    color: PropTypes.string,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    arrow: PropTypes.bool,
    onActivate: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

export function ColoredHeader({ color, ...props }) {
    const { disabled, isActive } = props
    const style = color && {
        backgroundColor: disabled ? null : isActive ? color : null,
        color: disabled ? null : isActive ? 'white' : null,
        borderBottomColor: color,
    }

    return <Header {...props} style={style} />
}
