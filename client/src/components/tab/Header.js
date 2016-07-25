import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Tab.css'
import Button, {INCOGNITO} from 'components/button'
import {ExpandLess, ExpandMore} from 'components/icons'

function K() {}

Header.propTypes = {
    children: PropTypes.element.isRequired,
	active: PropTypes.bool,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
    onExpandClick: PropTypes.func,
    color: PropTypes.string,
    arrow: PropTypes.bool,
}

function computeArrowStyle({color}) {
    if (!color) {
        return null
    }

    return {
        borderTopColor: color,
    }
}

function computeStyle({color, active}) {
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
    onClick = K,
    onExpandClick = K,
    color,
    children,
}) {
    const icon = expanded ? <ExpandLess inverse /> : <ExpandMore inverse />
    const style = computeStyle({color, active, arrow})
    const styleName = active ? 'ListItem--Active' : 'ListItem'
    const showArrow = arrow && active

	return (
        <li role='tab' {...{onClick, styleName, style}} >
            {children}
            {showArrow &&
                <span styleName='ListItem--Arrow' style={computeArrowStyle({color})} />
            }
            <Button styleName='ExpandButton' kind={INCOGNITO} onClick={onExpandClick} icon={icon} />
        </li>
    )
}

export default CSSModules(Header, styles)
