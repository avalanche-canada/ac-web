import React, {PropTypes} from 'react'
import {compose, onlyUpdateForKeys, withHandlers} from 'recompose'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import ItemSet from './ItemSet'

function K() {}

Drawer.propTypes = {
    header: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

function Drawer({header, onClose = K, onClick, style = null, children}) {
    return (
        <nav style={style} styleName='Drawer' onClick={onClick}>
            <section styleName='Toolbar'>
                <Link to='/' styleName='Home' title='Go to home page' />
                <a href='#' onClick={onClose} styleName='Close' title='Close' />
            </section>
            {children}
        </nav>
    )
}

export default compose(
    onlyUpdateForKeys(['children', 'style']),
    withHandlers({
        onClick: props => event => {
            const {target, currentTarget} = event

            if (target !== currentTarget) {
                return
            }

            props.onClick(event)
        }
    }),
    CSSModules(styles),
)(Drawer)
