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
}

Header.contextTypes = {
    theme: PropTypes.string.isRequired,
}

function Header({
    children,
    active = false,
    expanded = false,
    onClick = K,
    onExpandClick = K
}, {
    theme
}) {
    const icon = expanded ? <ExpandLess inverse /> : <ExpandMore inverse />
    const styleName = active ? `ListItem--${theme}--active` : `ListItem--${theme}`

	return (
        <li role='tab' {...{onClick, styleName}} >
            {children}
            <Button styleName='ListItem__ExpandButton' kind={INCOGNITO} onClick={onExpandClick} icon={icon} />
        </li>
    )
}

export default CSSModules(Header, styles)
