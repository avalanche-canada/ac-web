import React, { PropTypes } from 'react'

Html.propTypes = {
    fragment: PropTypes.string.isRequired,
    document: PropTypes.string.isRequired,
}

export default function Html({ fragment, document }) {
	const frag = document.get(fragment)

	if (frag === null) {
		return null
	}

	return (
		<div dangerouslySetInnerHTML={{ __html: frag.asHtml() }} />
	)
}
