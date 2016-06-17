import React, { PropTypes, createElement, DOM } from 'react'

Text.propTypes = {
    document: PropTypes.object.isRequired,
    fragment: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default function Text({ document, fragment, component = DOM.p }) {
	const frag = document.get(fragment)

	if (frag === null) {
		return null
	}

	return createElement(component, null, frag.asText())
}
