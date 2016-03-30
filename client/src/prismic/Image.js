import React, { PropTypes } from 'react'
import getDocument from './getDocument'

Image.propTypes = {
	fragment: PropTypes.string.isRequired,
	openNewTab: PropTypes.bool
}

function Image({ fragment, document, openNewTab = false }) {
	const image = document.getImage(fragment)

	if (image === null) {
		return <noscript></noscript>
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

export default getDocument(Image)
