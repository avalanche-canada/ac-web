import React from 'react'
import PropTypes from 'prop-types'

Image.propTypes = {
	image: PropTypes.object,
}

function Image({image}) {
	if (!image) {
		return null
	}

	const {url} = image

	return (
		<img src={url} />
	)
}

export default Image
