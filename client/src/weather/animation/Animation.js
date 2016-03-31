import React from 'react'
import styles from './Animation.css'
import CSSModules from 'react-css-modules'

function Animation({ children }) {
	return (
		<div styleName='Container'>
			{children}
		</div>
	)
}

export default CSSModules(Animation, styles)
