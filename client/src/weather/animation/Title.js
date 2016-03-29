import React, { PropTypes } from 'react'
import styles from './Animation.css'
import CSSModules from 'react-css-modules'

function Title({ children }) {
	return (
		<p styleName='Title'>
			{children}
		</p>
	)
}

export default CSSModules(Title, styles)
