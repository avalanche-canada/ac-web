import React, { PropTypes } from 'react'
import getDocument from './getDocument'

Image.propTypes = {
	fragment: PropTypes.string.isRequired
}

function Image({ fragment, document }) {
	const image = document.getImage(fragment)

	if (image === null) {
		return <noscript></noscript>
	}

	const { url } = image.main

	return (
		<img src={url} />
	)
}

export default getDocument(Image)
