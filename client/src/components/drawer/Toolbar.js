import React from 'react'
import {compose} from 'recompose'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import styles from './Drawer.css'
import {neverUpdate} from 'compose'

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
    neverUpdate,
    CSSModules(styles),
)(Toolbar)
