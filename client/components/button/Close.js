import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import Button from './Button'
import { SUBTILE } from './kinds'
import styles from './Button.css'

Close.propTypes = {
    children: PropTypes.node.isRequired,
}

function Close({ children = '×', ...rest }) {
    return (
        <Button kind={SUBTILE} styleName="Close" {...rest}>
            {children}
        </Button>
    )
}

export default CSSModules(Close, styles)
