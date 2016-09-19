import React, { PropTypes, Children, cloneElement} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import {Expand} from 'components/button'

function K() {}

Row.propTypes = {
    children: PropTypes.node.isRequired,
    hide: PropTypes.bool,
    controlled: PropTypes.bool,
    expanded: PropTypes.bool,
    onExpandedToggle: PropTypes.func,
    clickable: PropTypes.bool,
    onClick: PropTypes.func,
}

function Row({children, expanded = null, onExpandedToggle = K, hide = false, controlled = false, onClick}) {
    const lastIndex = Children.count(children) - 1
    const expandable = expanded !== null
    let styleName = controlled ? 'Row--Controlled' : 'Row'

    if (hide) {
        styleName += ' Row--Hide'
    }

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
                const style = {
                    paddingRight: 36
                }

                return cloneElement(child, {style}, [child.props.children, button])
            }) : children}
        </tr>
    )
}

export default CSSModules(Row, styles, {allowMultiple: true})
