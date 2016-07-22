import React, {PropTypes} from 'react'

Icon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
    viewBox: PropTypes.string,
    fill: PropTypes.string,
}

export default function Icon({
	children,
	height = 24,
	width = 24,
    viewBox = '0 0 24 24',
    fill = 'none',
}) {
	return (
		<svg {...{height, width, viewBox, fill}}>
			{children}
		</svg>
	)
}
