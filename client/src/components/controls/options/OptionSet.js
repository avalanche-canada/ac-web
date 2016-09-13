import React, {PropTypes, Children, cloneElement} from 'react'
import CSSModules from 'react-css-modules'
import {} from 'recompose'
import styles from './OptionSet.css'

OptionSet.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    show: PropTypes.bool,
    onOptionClick: PropTypes.func,
    selected: PropTypes.instanceOf(Set),
}

function OptionSet({
    show = false,
    selected = new Set(),
    onOptionClick,
    children
}) {
    if (!show) {
        return null
    }

    return (
        <div styleName='OptionSet'>
            {Children.map(children, option => (
                cloneElement(option, {
                    active: selected.has(option.props.value),
                    onClick: onOptionClick,
                })
            ))}
        </div>
    )
}

export default CSSModules(OptionSet, styles)
