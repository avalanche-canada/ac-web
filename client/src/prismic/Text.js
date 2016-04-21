import React, { PropTypes, createElement } from 'react'

Text.propTypes = {
    fragment: PropTypes.string.isRequired,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default function Text({ document, fragment, component = 'p' }) {
	const frag = document.get(fragment)

	if (frag === null) {
		return null
	}

	return createElement(component, null, frag.asText())
}
