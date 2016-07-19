import React, { PropTypes, Children, cloneElement } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Table.css'
import { ExpandButton } from '../misc'

function K() {}

Row.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
    hide: PropTypes.bool,
    controlled: PropTypes.bool,
    expanded: PropTypes.bool,
    onExpandedToggle: PropTypes.func,
}

function Row({ children, expanded = null, onExpandedToggle = K, hide = false, controlled = false }) {
    const lastIndex = Children.count(children) - 1
    const expandable = expanded !== null
    const styleNames = [controlled ? 'Row--Controlled' : 'Row']

    if (hide) {
        styleNames.push('Row--Hide')
    }

    return (
        <tr styleName={styleNames.join(' ')}>
            {expandable ? Children.map(children, (child, index) => {
                if (index !== lastIndex) {
                    return child
                }

                const button = <ExpandButton expanded={expanded} onClick={onExpandedToggle} />
                const style = {
                    paddingRight: 36
                }

                return cloneElement(child, {style}, [child.props.children, button])
            }) : children}
        </tr>
    )
}

export default CSSModules(Row, styles, { allowMultiple: true })
