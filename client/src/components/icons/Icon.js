import React, { PropTypes } from 'react'

Icon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
}

export default function Icon({
	children,
	height = 24,
	width = 24,
	...props
}) {
	return (
		<svg fill="none" viewBox="0 0 24 24" {...{height, width}} xmlns="http://www.w3.org/2000/svg">
			{children}
		</svg>
	)
}
