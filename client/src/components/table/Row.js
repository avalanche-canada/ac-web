import React, { PropTypes, Children, cloneElement} from 'react'
import {compose, onlyUpdateForKeys} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import {Expand} from 'components/button'

function K() {}
const TR_WITH_BUTTON_PROPS = {
    style: {
        paddingRight: 36
    }
}

Row.propTypes = {
    children: PropTypes.node.isRequired,
    hide: PropTypes.bool,
    controlled: PropTypes.bool,
    expanded: PropTypes.bool,
    onExpandedToggle: PropTypes.func,
    onClick: PropTypes.func,
}

const TR = <tr></tr>

function Row({children, expanded = null, onExpandedToggle = K, hide = false, controlled = false, onClick}) {
    if (hide) {
        return TR
    }

    const lastIndex = Children.count(children) - 1
    const expandable = expanded !== null
    let styleName = controlled ? 'Row--Controlled' : 'Row'

    if (typeof onClick === 'function') {
        styleName += ' Row--Clickable'
    }

    return (
        <tr styleName={styleName} onClick={onClick}>
            {expandable ? Children.map(children, (child, index) => {
                if (index !== lastIndex) {
                    return child
                }

                const button = <Expand key={index} expanded={expanded} onClick={onExpandedToggle} />

                return cloneElement(child, TR_WITH_BUTTON_PROPS, [child.props.children, button])
            }) : children}
        </tr>
    )
}

export default compose(
    onlyUpdateForKeys(['children', 'hide', 'expanded']),
    CSSModules(styles, {allowMultiple: true}),
)(Row)
