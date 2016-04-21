import React, { PropTypes, createElement } from 'react'
import getDocument from './getDocument'

const { string, node, oneOfType } = PropTypes

function Text({ document, fragment, component = 'p' }) {
	const frag = document.get(fragment)

	if (frag === null) {
		return null
	}

	return createElement(component, null, frag.asText())
}

Text.propTypes = {
	fragment: string.isRequired,
	component: oneOfType([string, node])
}

export default getDocument(Text)
