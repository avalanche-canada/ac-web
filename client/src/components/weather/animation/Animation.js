import React, { PropTypes } from 'react'
import styles from './Animation.css'
import CSSModules from 'react-css-modules'

Animation.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

function Animation({ children }) {
	return (
		<div styleName='Container'>
			{children}
		</div>
	)
}

export default CSSModules(Animation, styles)
