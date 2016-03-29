import { PropTypes } from 'react'
import { getContext } from 'recompose'

const contextTypes = {
	document: PropTypes.object.isRequired
}

export default function getDocument(BaseComponent) {
	return getContext(contextTypes, BaseComponent)
}
