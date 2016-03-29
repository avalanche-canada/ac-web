import React, { PropTypes } from 'react'

Tab.propTypes = {
	title: PropTypes.node.isRequired
}

export default function Tab({ children }) {
	return (
		<div role='tabpanel'>
			{children}
		</div>
	)
}
