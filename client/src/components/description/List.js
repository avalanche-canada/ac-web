import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import styles from './Description.css'

List.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    columns: PropTypes.oneOf([1, 2]),
    theme: PropTypes.oneOf(['Simple', 'Inverse']),
    condensed: PropTypes.bool,
    bordered: PropTypes.bool,
}

function List({columns = 1, theme = 'Simple', condensed = false, bordered = false, children}) {
    const styleName = classNames(`List--${theme}--${columns}Columns`, {
        Condensed: condensed,
        Bordered: bordered,
    })

    return (
        <dl styleName={styleName} >
            {children}
        </dl>
    )
}

export default CSSModules(List, styles, {allowMultiple: true})
