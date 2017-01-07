import React, {PropTypes} from 'react'
import {compose, onlyUpdateForKeys, withHandlers} from 'recompose'
import CSSModules from 'react-css-modules'
import ItemSet from './ItemSet'
import Toolbar from './Toolbar'
import styles from './Drawer.css'

function K() {}

Drawer.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

function Drawer({label, to, onClose = K, onClick, style = null, children}) {
    return (
        <nav style={style} styleName='Drawer' onClick={onClick}>
            <Toolbar onClose={onClose} />
            <ItemSet label={label} to={to} items={children} />
        </nav>
    )
}

export default compose(
    onlyUpdateForKeys(['style']),
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
