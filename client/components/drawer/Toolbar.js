import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import CSSModules from 'react-css-modules'
import Link from 'react-router/lib/Link'
import styles from './Drawer.css'
import { neverUpdate } from '~/compose'

Toolbar.propTypes = {
    onClose: PropTypes.func.isRequired,
    home: PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
}

function Toolbar({ onClose, home = { to: '/' } }) {
    return (
        <section styleName="Toolbar">
            <Link to={home.to} styleName="Home" title="Go to home page" />
            <a href="#" onClick={onClose} styleName="Close" title="Close" />
        </section>
    )
}

export default compose(neverUpdate, CSSModules(styles))(Toolbar)
