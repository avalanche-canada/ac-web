import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Instruction.css'

Item.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
}

function Item({title, children}) {
    return (
        <li styleName='Item'>
            <span styleName='Title'>{title}</span>
            {children}
        </li>
    )
}

export default CSSModules(Item, styles)
