import React, { PropTypes } from 'react'
import getDocument from './getDocument'

function Html({ fragment, document }) {
	const frag = document.get(fragment)

	if (frag === null) {
		return <noscript></noscript>
	}

	return (
		<div dangerouslySetInnerHTML={{ __html: frag.asHtml() }} />
	)
}

Html.propTypes = {
	fragment: PropTypes.string.isRequired
}

export default getDocument(Html)
