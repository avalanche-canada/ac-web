import { PropTypes } from 'react'
import { getContext } from 'recompose'

const contextTypes = {
	faq: PropTypes.object.isRequired
}

export default function getFAQ(BaseComponent) {
	return getContext(contextTypes)(BaseComponent)
}
