import React, {PropTypes} from 'react'

Image.propTypes = {
	image: PropTypes.object,
}

export default function Image({image}) {
	if (!image) {
		return null
	}

	const {url} = image

	return (
		<img src={url} />
	)
}
