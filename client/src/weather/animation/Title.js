import React, { PropTypes } from 'react'
import styles from './Animation.css'
import CSSModules from 'react-css-modules'

Title.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

function Title({ children }) {
	return (
		<p styleName='Title'>
			{children}
		</p>
	)
}

export default CSSModules(Title, styles)
