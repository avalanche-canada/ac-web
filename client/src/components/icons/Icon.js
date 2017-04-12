import React from 'react'
import PropTypes from 'prop-types'

Icon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
    viewBox: PropTypes.string,
    fill: PropTypes.string,
}

function Icon({
	children,
	height = 24,
	width = 24,
    viewBox = '0 0 24 24',
    fill = 'none',
    className,
}) {
	return (
		<svg {...{height, width, viewBox, fill, className}}>
			{children}
		</svg>
	)
}

export default Icon
