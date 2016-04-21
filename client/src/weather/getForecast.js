import { PropTypes } from 'react'
import { getContext } from 'recompose'

const contextTypes = {
	forecast: PropTypes.object.isRequired
}

export default function getForecast(BaseComponent) {
	return getContext(contextTypes)(BaseComponent)
}
