import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Description.css'

List.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    columns: PropTypes.oneOf([1, 2]),
    horizontal: PropTypes.bool,
}

function List({ columns = 1, horizontal = false, children }) {
    let styleName = horizontal ? 'List--Horizontal' : 'List'

    styleName += ` List--${columns}Columns`

    return (
        <dl styleName={styleName}>
            {children}
        </dl>
    )
}

export default CSSModules(List, styles, { allowMultiple: true })
