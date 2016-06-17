import React from 'react'
import { pure } from 'recompose'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './Footer.css'

const year = new Date().getFullYear()

function Footer() {
	return (
		<footer styleName='Container'>
            <div styleName='Content'>
                <nav styleName='Nav'>
                    <Link styleName='Link' to='/about'>Contact</Link>
                    <Link styleName='Link' to='/tou/disclaimer'>Disclaimer</Link>
                    <Link styleName='Link' to='/tou/privacy'>Privacy Policy</Link>
                    <Link styleName='Link' to='/tou'>Terms of Use</Link>
                </nav>
                <span styleName='Rights'>
                    ©{year} Avalanche Canada, All Rights Reserved
                </span>
            </div>
		</footer>
	)
}

export default pure(CSSModules(Footer, styles))
