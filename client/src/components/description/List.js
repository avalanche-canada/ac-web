import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Description.css'

List.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    columns: PropTypes.oneOf([1, 2]),
    horizontal: PropTypes.bool,
}

function List({ columns = 1, horizontal = false, children }) {
    const styleNames = [horizontal ? 'List--Horizontal' : 'List']

    styleNames.push(`List--${columns}Columns`)

    return (
        <dl styleName={styleNames.join(' ')}>
            {children}
        </dl>
    )
}

export default CSSModules(List, styles, { allowMultiple: true })
