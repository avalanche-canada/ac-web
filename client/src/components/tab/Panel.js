import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Tab.css'

Panel.propTypes = {
	active: PropTypes.bool
}

function Panel({ children, active = false }) {
    const styleName = active === true ? 'Panel--active' : 'Panel'
    
	return (
		<div styleName={styleName} role='tabpanel'>
			{children}
		</div>
	)
}

export default CSSModules(Panel, styles)
