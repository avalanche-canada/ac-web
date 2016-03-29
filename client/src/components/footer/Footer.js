import React from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from 'Footer.css'

function Footer() {
	const year = new Date().getFullYear()

	return (
		<footer styleName='Container'>
			<Link styleName='Link' to='about'>Contact</Link>
			<Link styleName='Link' to='tou'>Terms of Use</Link>
			<Link styleName='Link' to='tou/privacy'>Privacy Policy</Link>
			<span styleName='Info'>
				©{year} Avalanche Canada, All Rights Reserved
			</span>
		</footer>
	)
}

export default pure(CSSModules(Footer, styles))
