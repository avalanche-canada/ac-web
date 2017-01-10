import React, {PropTypes} from 'react'
import {compose} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Problem.css'

Problem.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

function Problem({title, children}) {
    return (
        <div styleName='Container'>
            <h2 styleName='Header'>{title}</h2>
            {children}
        </div>
    )
}

export default CSSModules(Problem, styles)
