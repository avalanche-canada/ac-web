import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Button.css'

export const PRIMARY = 'primary'
export const SECONDARY = 'secondary'

Button.propTypes = {
    type: PropTypes.oneOf([PRIMARY, SECONDARY])
}

function Button({ type = PRIMARY, children, ...rest }) {
	return (
		<button styleName={type} {...rest}>
			{children}
		</button>
	)
}

export default CSSModules(Button, styles)
