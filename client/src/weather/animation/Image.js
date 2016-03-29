import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Animation.css'
import Image from '../Image'

AnimationImage.propTypes = {
	url: PropTypes.string.isRequired,
	onError: PropTypes.func,
	onLoad: PropTypes.func,
}

function K() {}

function AnimationImage(props) {
	return (
		<Image styleName='Image' {...props} />
	)
}

export default CSSModules(AnimationImage, styles)
