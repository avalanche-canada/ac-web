import React, { PropTypes } from 'react'
import { mapProps } from 'recompose'
import { mapUrlToSrc } from './utils/Image'

Image.propTypes = {
	url: PropTypes.string.isRequired,
	openNewTab: PropTypes.bool,
}
Image.defaultProps = {
	openNewTab: false
}

function Image({openNewTab, ...props}) {
	const image = <img {...props} />

	if (openNewTab) {
		return (
			<a href={props.url} target='_blank'>
				{image}
			</a>
		)
	}

	return image
}

export default mapProps(props => mapUrlToSrc(props, true), Image)
