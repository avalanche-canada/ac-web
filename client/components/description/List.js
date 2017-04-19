import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import styles from './Description.css'

List.propTypes = {
    children: PropTypes.node.isRequired,
    columns: PropTypes.oneOf([1, 2, 3]),
    theme: PropTypes.oneOf(['Simple', 'Inverse']),
    condensed: PropTypes.bool,
    bordered: PropTypes.bool,
}

function computeStyleName(columns, theme, condensed, bordered) {
    return classNames(`List--${theme}--${columns}Columns`, {
        Condensed: condensed,
        Bordered: bordered,
    })
}

function List({
    columns = 1,
    theme = 'Simple',
    condensed = false,
    bordered = false,
    children
}) {
    return (
        <dl styleName={computeStyleName(columns, theme, condensed, bordered)} >
            {children}
        </dl>
    )
}

export default CSSModules(List, styles, { allowMultiple: true })
