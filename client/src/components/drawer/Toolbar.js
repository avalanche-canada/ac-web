import React from 'react'
import {compose, shouldUpdate} from 'recompose'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import styles from './Drawer.css'

Toolbar.propTypes = {
    onClose: PropTypes.func.isRequired,
}

function Toolbar({onClose}) {
    return (
        <section styleName='Toolbar'>
            <Link to='/' styleName='Home' title='Go to home page' />
            <a href='#' onClick={onClose} styleName='Close' title='Close' />
        </section>
    )
}

export default compose(
    shouldUpdate(() => false),
    CSSModules(styles),
)(Toolbar)
