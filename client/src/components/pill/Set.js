import React, {Children, cloneElement} from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import {compose, withState, setDisplayName} from 'recompose'
import styles from './Pill.css'
import noop from 'lodash/noop'

Set.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.number,
    setActiveIndex: PropTypes.func,
    onActivate: PropTypes.func,

}

function Set({activeIndex = 0, onActivate = noop, setActiveIndex, children}) {
    return (
        <ul styleName='Set'>
            {Children.map(children, (item, index) => (
                cloneElement(item, {
                    active: activeIndex === index,
                    onClick() {
                        setActiveIndex(index)
                        onActivate(index)
                    }
                })
            ))}
        </ul>
    )
}

export default compose(
    setDisplayName('PillSet'),
    withState('activeIndex', 'setActiveIndex', props => props.activeIndex),
    CSSModules(styles),
)(Set)
