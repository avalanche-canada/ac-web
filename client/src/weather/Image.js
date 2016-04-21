import React, { PropTypes } from 'react'
import { mapProps } from 'recompose'
import { mapUrlToSrc } from './utils/Image'

Image.propTypes = {
	url: PropTypes.string.isRequired,
	openNewTab: PropTypes.bool,
}

function Image({ openNewTab = false, ...rest }) {
	const image = <img {...rest} />

	if (openNewTab) {
		return (
			<a href={rest.src} target='_blank'>
				{image}
			</a>
		)
	}

	return image
}

function propsMapper(props) {
    return mapUrlToSrc(props, true)
}

export default mapProps(propsMapper)(Image)
