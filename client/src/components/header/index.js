import React from 'react'
import { pure } from 'recompose'

function Footer() {
	const year = new Date().getFullYear()

	return (
		<footer>
			©{year} Avalanche Canada, All Rights Reserved
		</footer>
	)
}

export default pure(Footer)
