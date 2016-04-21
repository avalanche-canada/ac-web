import React, { PropTypes } from 'react'

Image.propTypes = {
	fragment: PropTypes.string.isRequired,
	openNewTab: PropTypes.bool
}

export default function Image({ fragment, document, openNewTab = false }) {
	const image = document.getImage(fragment)

	if (image === null) {
		return null
	}

	const { url } = image.main

	if (openNewTab === true) {
		return (
			<a href={url} target='_blank'>
				<img src={url} />
			</a>
		)
	}


	return (
		<img src={url} />
	)
}
