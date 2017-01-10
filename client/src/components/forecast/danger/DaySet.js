import React, {PropTypes, Children, cloneElement} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Danger.css'

function cloneDay(day, index) {
    return cloneElement(day, {
        first: index === 0
    })
}

DaySet.propTypes = {
    children: PropTypes.node.isRequired,
}

function DaySet({children}) {
    return (
        <div styleName='DaySet'>
            {Children.map(children, cloneDay)}
        </div>
    )
}

export default CSSModules(DaySet, styles)
