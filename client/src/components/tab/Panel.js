import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Tab.css'

Panel.propTypes = {
	active: PropTypes.bool
}

function Panel({ children, active = false }) {
	return (
		<div styleName={active === true ? 'Panel--active' : 'Panel'} role='tabpanel'>
			{children}
		</div>
	)
}

export default CSSModules(Panel, styles)
