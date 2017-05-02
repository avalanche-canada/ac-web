import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'
import Button from '../button'

Reset.propTypes = {
    children: PropTypes.string.isRequired,
}

function Reset({ children }) {
    return (
        <Button type="reset" styleName="Reset">
            {children}
        </Button>
    )
}

export default CSSModules(Reset, styles)
