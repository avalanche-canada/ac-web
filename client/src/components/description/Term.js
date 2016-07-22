import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Description.css'

Term.propTypes = {
    children: PropTypes.node.isRequired,
}

function Term({ children }) {
    return (
        <dt styleName='Term'>
            {children}
        </dt>
    )
}

export default CSSModules(Term, styles)
