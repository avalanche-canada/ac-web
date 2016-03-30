import React, { PropTypes } from 'react'
import styles from './Button.css'
import { setPropTypes, setDisplayName, pure } from 'recompose'
import CSSModules from 'react-css-modules'

export const PRIMARY = 'primary'
export const SECONDARY = 'secondary'

export default CSSModules(setPropTypes({
	type: PropTypes.oneOf([PRIMARY, SECONDARY])
}, function Button({
	type = PRIMARY,
	children,
	...props
}) {
	return (
		<button styleName={type} {...props}>
			{children}
		</button>
	)
}), styles)
