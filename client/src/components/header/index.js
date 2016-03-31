import React from 'react'
import { pure } from 'recompose'

function Navbar() {
	const year = new Date().getFullYear()

	return (
		<footer>
			©{year} Avalanche Canada, All Rights Reserved
		</footer>
	)
}

export default pure(Footer)
