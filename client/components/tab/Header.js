import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Tab.css'
import Button, { INCOGNITO } from '~/components/button'
import { ExpandLess, ExpandMore } from '~/components/icons'
import noop from 'lodash/noop'

Header.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
    onExpandClick: PropTypes.func,
    color: PropTypes.string,
    arrow: PropTypes.bool,
    disabled: PropTypes.bool,
}

function computeArrowStyle({ color }) {
    if (!color) {
        return null
    }

    return {
        borderTopColor: color,
    }
}

function computeStyle({ color, active }) {
    if (!color) {
        return null
    }

    const style = {
        borderBottomColor: color,
    }

    if (active) {
        style.backgroundColor = color
    }

    return style
}

function Header({
    active = false,
    expanded = false,
    arrow = false,
    onClick = noop,
    onExpandClick = noop,
    color,
    disabled,
    children,
}) {
    const icon = expanded ? <ExpandLess inverse /> : <ExpandMore inverse />
    const style = computeStyle({ color, active, arrow })
    let styleName = 'ListItem'
    const showArrow = arrow && active

    if (disabled) {
        styleName = 'ListItem--Disabled'
    } else if (active) {
        styleName = 'ListItem--Active'
    }

    return (
        <li role="tab" {...{ onClick, styleName, style }}>
            {children}
            {showArrow &&
                <span
                    styleName="ListItem--Arrow"
                    style={computeArrowStyle({ color })}
                />}
            <Button
                type="button"
                styleName="ExpandButton"
                kind={INCOGNITO}
                onClick={onExpandClick}
                icon={icon}
            />
        </li>
    )
}

export default CSSModules(Header, styles, { allowMultiple: true })
